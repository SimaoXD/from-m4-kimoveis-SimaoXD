import { Router } from "express";
import { verifyDataBody } from "../middlewares/verify.middlewares";
import { userDataLogSchema } from "../schemas";
import { sessionLogUser } from "../controllers";

const sessionRouter = Router();

sessionRouter.post("", verifyDataBody(userDataLogSchema), sessionLogUser);

export { sessionRouter };
