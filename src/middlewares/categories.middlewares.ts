import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import AppError from "../errors/AppError";
import { TMiddleware } from "../interfaces/login.interfaces";

const verifyCategoryExists: TMiddleware<void> = async (req, res, next) => {
  const { name } = req.body;
  const pathList = req.path;
  const categoryRepo = AppDataSource.getRepository(Category);

  if (pathList.includes("realEstate")) {
    const id = Number(req.params.id);
    const category = await categoryRepo.findOneBy({ id });

    if (!category) throw new AppError("Category not found", 404);

    return next();
  }

  const category = await categoryRepo.findOneBy({ name });

  if (category) throw new AppError("Category already exists", 409);

  return next();
};

export { verifyCategoryExists };
