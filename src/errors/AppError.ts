import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
  }
}

export const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
  error instanceof AppError
    ? res.status(error.statusCode).json({ message: error.message })
    : error instanceof ZodError
    ? res.status(400).json({ message: error.flatten().fieldErrors })
    : res.status(500).json({ message: "Internal Server Error" });
};

export default AppError;
