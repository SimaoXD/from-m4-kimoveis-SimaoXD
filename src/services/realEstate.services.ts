import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address, Category, RealEstate } from "../entities";
import { TService } from "../interfaces/login.interfaces";
import { IRealEstatePublic, IRealEstateRegister } from "../interfaces/realEstate.interfaces";
import { realEstateDataPublicSchema } from "../schemas/realEstate.schemas";
import { addressDataPublicSchema } from "../schemas/address.schemas";

const createPropriety: TService<IRealEstatePublic, IRealEstateRegister> = async (payload) => {
  const { address: addressService } = payload;
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const address = addressRepo.create(addressPropriety);
  const category = await categoryRepo.findOneBy({
    id: payload.categoryId,
  });

  if (!category) throw new AppError("Category not exists", 404);

  const addressExists = await addressRepo
    .createQueryBuilder("address")
    .where("address.street = :street", { street: addressPropriety.street })
    .andWhere("address.number =:number", { number: addressPropriety.number })
    .getOne();

  if (addressExists) throw new AppError("Address already exists", 409);

  await addressRepo.save(address);

  const newAddress = addressDataPublicSchema.parse(address);
  const propriety = realEstateRepo.create({ ...payload, category, address });

  await realEstateRepo.save(propriety);
  const proprietyInfo = await realEstateRepo
    .createQueryBuilder("propriety")
    .leftJoinAndSelect("propriety.address", "address")
    .leftJoinAndSelect("propriety.category", "category")
    .where("propriety.id = id", { id: propriety.id })
    .getOne();

  return realEstateDataPublicSchema.parse(proprietyInfo);
};

const proprietyList = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const propriety = await realEstateRepo.createQueryBuilder("propriety").leftJoinAndSelect("proriety.address", "address").getMany();

  return propriety;
};

export { createPropriety, proprietyList };
