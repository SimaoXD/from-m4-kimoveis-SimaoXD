import "dotenv/config";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category, User } from "../entities";
import { TMiddleware } from "../interfaces/login.interfaces";
import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import AppError from "../errors/AppError";
import * as jwt from "jsonwebtoken";

const verifyEmailExists: TMiddleware<void> = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next();

  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });

  if (user) throw new AppError("Email already exists", 409);

  return next();
};

const verifyUserExists: TMiddleware<void> = async (req, res, next) => {
  const id = Number(req.params.id);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id });

  if (!user) throw new AppError("User not found", 404);

  res.locals.user = user;

  return next();
};

const verifyCategoryExists: TMiddleware<void> = async (req, res, next) => {
  const { name } = req.body;
  const pathList = req.path;
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const category = await categoryRepo.findOneBy({ name });

  if (category) throw new AppError("Category already exists", 409);

  return next();
};

const verifyDataBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  const payload = schema.parse(req.body);
  res.locals.data = payload;

  return next();
};

export { verifyEmailExists, verifyUserExists, verifyCategoryExists, verifyDataBody };
