import { Router } from "express";
import { verifyCategoryExists } from "../middlewares/categories.middlewares";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/user.middlewares";
import { verifyDataBody } from "../middlewares/verify.middlewares";
import { categoryDataRegisterSchema } from "../schemas";
import { createCategory, getListCategory, getProprietyList } from "../controllers";

const categorieRouter = Router();

categorieRouter.post(
  "",
  verifyCategoryExists,
  verifyTokenUser,
  verifyUserAdmin,
  verifyDataBody(categoryDataRegisterSchema),
  createCategory
);
categorieRouter.get("", getListCategory);
categorieRouter.get("/:id/realEstate", getProprietyList);

export { categorieRouter };
