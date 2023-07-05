import { NextFunction, Response, Request } from "express";

interface ITokenInfo {
  admin: boolean;
  sub: string;
  iat: number;
}

type TController = (req: Request, res: Response) => Promise<Response>;
type TService<T, P> = (payload: P) => Promise<T>;
type TMiddleware<T> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export { ITokenInfo, TController, TService, TMiddleware };
