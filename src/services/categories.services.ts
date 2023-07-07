import { Repository } from "typeorm";
import { Request } from "express";
import { ICategoryPublic, ICategoryRegister } from "../interfaces/category.interfaces";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { categoryDataPublicSchema } from "../schemas/categories.schemas";
import AppError from "../errors/AppError";

const requestCreateCategorie = async (payload: ICategoryRegister): Promise<ICategoryPublic> => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);
  const category = await categoryRepo.save(payload);
  return categoryDataPublicSchema.parse(category);
};

const requestCategoriesList = async (): Promise<ICategoryPublic[]> => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);
  const categories = await categoryRepo.find();
  return categories;
};
const requestProprietyListCategory = async (payload: Request): Promise<Category> => {
  const id = Number(payload.params.id);
  const realEstateRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const proprietyList = await realEstateRepo
    .createQueryBuilder("category")
    .select()
    .innerJoinAndSelect("category.realEstate", "propriety")
    .where("category.id = :categoryId", { categoryId: id })
    .getOne();

  if (!proprietyList) throw new AppError("Category not found", 404);

  return proprietyList;
};

export { requestCreateCategorie, requestCategoriesList, requestProprietyListCategory };
