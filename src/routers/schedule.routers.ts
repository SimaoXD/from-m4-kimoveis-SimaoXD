import { Router } from "express";

import { verifyDataBody } from "../middlewares/verify.middlewares";
import { scheduleDataRegisterSchema } from "../schemas";
import { createSchedule, getProprietyListSchedule } from "../controllers";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/validation.middlewares";

const scheduleRouter = Router();

scheduleRouter.post("", verifyTokenUser, verifyDataBody(scheduleDataRegisterSchema), createSchedule);

scheduleRouter.get("/realEstate/:id", verifyTokenUser, verifyUserAdmin, getProprietyListSchedule);

export { scheduleRouter };
