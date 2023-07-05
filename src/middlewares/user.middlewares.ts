import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { TMiddleware } from "../interfaces/login.interfaces";

const verifyEmailExists: TMiddleware<void> = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });

  if (user) throw new AppError("Email already exists", 409);

  return next();
};

const verifyTokenUser: TMiddleware<void> = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) throw new AppError("Missing bearer token", 401);

  const token = auth.split("")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError(err.message, 401);

    const path = req.baseUrl;
    const owner = path == "/users" ? req.params.id == decoded.sub : true;
    const admin = decoded.admin;

    if (!admin && !owner) throw new AppError("Insufficient permission", 403);

    res.locals.userId = decoded.sub;
  });

  return next();
};

const verifyUserAdmin: TMiddleware<void> = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) throw new AppError("Missing beare token", 401);

  const token = auth.split("")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError(err.message, 401);

    const admin = decoded.admin;

    if (!admin) throw new AppError("Insufficient permission", 403);

    res.locals.userId = decoded.sub;
  });
  return next();
};

const verifyUserExists: TMiddleware<void> = async (req, res, next) => {
  const id = Number(req.params.id);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id });

  if (!user) throw new AppError("User not found", 404);

  res.locals.user;

  return next();
};

export { verifyEmailExists, verifyTokenUser, verifyUserAdmin, verifyUserExists };
