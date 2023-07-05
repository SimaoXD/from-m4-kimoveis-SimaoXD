import { Router } from "express";
import { verifyDataBody } from "../middlewares/verify.middlewares";
import { userDataLogSchema } from "../schemas";
import { sessioLogUser } from "../controllers";

const sessionRouter = Router();

sessionRouter.post("", verifyDataBody(userDataLogSchema), sessioLogUser);

export { sessionRouter };
