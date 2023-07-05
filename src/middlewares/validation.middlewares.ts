import { TMiddleware } from "../interfaces/login.interfaces";

const verifyTokenUser: TMiddleware<void> = async (req, res, next) => {
  const auth = req.headres.authorization;

  if (!auth) throw new AppError("Missing bearer token", 401);

  const token = auth.split("")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError(err.message, 401);

    const path = req.baseUrl;
    const owner = path == "/users" ? req.params.id == decoded.sub : true;
    const admin = decoded.admin;

    if (!admin && !owner) throw new AppError("Insufficient permission", 403);

    res.locals.userId = decoded.sub;
    res.locals.admin = decoded.admin;
  });
  return next();
};

const verifyUserAdmin: TMiddleware<void> = async (req, res, next) => {
  const admin = res.locals.admin;

  if (!admin) throw new AppError("Insufficient permission", 403);

  return next();
};

export { verifyTokenUser, verifyUserAdmin };
