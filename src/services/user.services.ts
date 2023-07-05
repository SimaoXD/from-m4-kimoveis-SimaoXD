import { AppDataSource } from "../data-source";
import * as crypt from "bcryptjs";
import { Repository } from "typeorm";
import { User } from "../entities";
import { TService } from "../interfaces/login.interfaces";
import { userDataPublicSchema, userListPublicSchema } from "../schemas/user.schemas";
import { IUserPrivate, IUserPublic, IUserRegister } from "../interfaces/users.interfaces";

const createUser: TService<IUserPublic, IUserRegister> = async (payload) => {
  const { password } = payload;

  const passHash = crypt.hashSync(password, 12);
  const dataUser = { ...payload, password: passHash };

  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user = userRepo.create(dataUser);

  await userRepo.save(user);

  return userDataPublicSchema.parse(user);
};

const readUsersList = async (): Promise<IUserPublic[]> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const usersList = await userRepo.find();

  return userListPublicSchema.parse(usersList);
};

const updateUser = async (payload: IUserPrivate, userFound: User): Promise<IUserPublic> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const userData = { ...userFound, ...payload } as User;
  const user = userRepo.create(userData);

  await userRepo.save(user);

  return userDataPublicSchema.parse(user);
};

const deleteUser: TService<void, number> = async (payload) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  await userRepo.createQueryBuilder("user").softDelete().where("id = :id", { id: payload }).execute();
};

export { createUser, readUsersList, updateUser, deleteUser };
