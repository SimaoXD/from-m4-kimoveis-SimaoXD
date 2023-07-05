import { Router } from "express";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/user.middlewares";
import { verifyDataBody } from "../middlewares/verify.middlewares";
import { realEstateDataRegisterSchema } from "../schemas";
import { createProperty, getProprietyList } from "../controllers";

const proprietyRouter = Router();

proprietyRouter.post("", verifyTokenUser, verifyUserAdmin, verifyDataBody(realEstateDataRegisterSchema), createProperty);
proprietyRouter.get("", getProprietyList);

export { proprietyRouter };
