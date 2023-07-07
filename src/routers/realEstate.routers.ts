import { Router } from "express";
import { verifyDataBody } from "../middlewares/verify.middlewares";
import { realEstateDataRegisterSchema } from "../schemas";
import { createProperty, getProprietyList } from "../controllers";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation.middlewares";

const proprietyRouter = Router();

proprietyRouter.post("", verifyTokenUser, verifyUserAdmin, verifyDataBody(realEstateDataRegisterSchema), createProperty);
proprietyRouter.get("", getProprietyList);

export { proprietyRouter };
