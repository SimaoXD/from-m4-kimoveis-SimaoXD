import * as jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const verifyTokenUser = (req: Request, res: Response, next: NextFunction): Response | void => {
  let token = req.headers.authorization;
  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }
  token = token.split(" ")[1];
  verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    res.locals = { ...res.locals, decoded };
  });
  return next();
};

const verifyUserAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const admin: boolean = res.locals.decoded.admin;
  if (!admin) throw new AppError("Insufficient permission", 403);
  return next();
};

export { verifyTokenUser, verifyUserAdmin };
