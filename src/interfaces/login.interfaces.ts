import { NextFunction, Response, Request } from "express";

interface ITokenInfo {
  admin: boolean;
  subject: string;
  iat: number;
}

type TMiddleware<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>;
type TController = (req: Request, res: Response) => Promise<Response>;
type TService<T, P> = (payload: P) => Promise<T>;

export { ITokenInfo, TController, TService, TMiddleware };
