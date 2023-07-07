import { Repository } from "typeorm";
import * as crypt from "bcryptjs";
import { User } from "../entities";
import { TService, IUserPublic, IUserRegister, IUserPrivate } from "../interfaces";
import { userDataPublicSchema, userListPublicSchema } from "../schemas";
import { AppDataSource } from "../data-source";

// const requestCreateUser: TService<IUserPublic, IUserRegister> = async (payload) => {
//   const { password } = payload;
//   const passHash = crypt.hashSync(password, 12);
//   const dataUser = { ...payload, password: passHash };

//   const userRepo: Repository<User> = AppDataSource.getRepository(User);
//   const user = userRepo.create(dataUser);

//   console.log(dataUser);
//   await userRepo.save(user);

//   return userDataPublicSchema.parse(user);
// };

const requestCreateUser = async (payload: IUserRegister): Promise<IUserPublic> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create({ ...payload });

  const save = await userRepository.save(user);

  const userResponse: IUserPublic = userDataPublicSchema.parse(user);
  console.log(userDataPublicSchema.parse(user));

  return userResponse;
};

const requestReadUsersList = async (): Promise<IUserPublic[]> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const usersList = await userRepo.find();

  return userListPublicSchema.parse(usersList);
};

const requestUpdateUser = async (payload: IUserPrivate, userFound: User): Promise<IUserPublic> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const userData = { ...userFound, ...payload } as User;
  const user = userRepo.create(userData);

  await userRepo.save(user);

  return userDataPublicSchema.parse(user);
};

const requestDeleteUser: TService<void, number> = async (payload) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  await userRepo.createQueryBuilder("user").softDelete().where("id = :id", { id: payload }).execute();
};

export { requestCreateUser, requestReadUsersList, requestUpdateUser, requestDeleteUser };
