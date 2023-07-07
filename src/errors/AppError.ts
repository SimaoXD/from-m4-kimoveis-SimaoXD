import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.statusCode = status;
    this.data = data;
  }
}

export const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message, data: error.data });
  } else if (error instanceof ZodError) {
    res.status(400).json({ message: "Validation error", errors: error.flatten().fieldErrors });
  } else {
    next(error);
  }
};

export default AppError;
