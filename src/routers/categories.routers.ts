import { Router } from "express";

import { verifyCategoryExists, verifyDataBody } from "../middlewares/verify.middlewares";
import { categoryDataRegisterSchema } from "../schemas";
import { createCategory, getListCategory, getProprietyList } from "../controllers";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation.middlewares";

const categorieRouter = Router();

categorieRouter.post(
  "",
  verifyDataBody(categoryDataRegisterSchema),
  verifyTokenUser,
  verifyUserAdmin,
  verifyCategoryExists,
  createCategory
);
categorieRouter.get("", getListCategory);
categorieRouter.get("/:id/realEstate", getProprietyList);

export { categorieRouter };
