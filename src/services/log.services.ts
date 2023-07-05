import * as crypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { TService } from "../interfaces/login.interfaces";
import { IUserLog } from "../interfaces/users.interfaces";

const logUser: TService<string, IUserLog> = async (payload) => {
  const { email, password } = payload;
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });

  if (!user) throw new AppError("invalid credentials", 401);

  const verifyPass = crypt.compareSync(password, user.password);

  if (!verifyPass) throw new AppError("Invalid credentials", 401);

  const key = process.env.SECRET_KEY!;
  const token = jwt.sign({ admin: user.admin }, key, { subject: String(user.id) });

  return token;
};

export { logUser };
