import { z } from "zod";
import { scheduleDataRegisterSchema } from "../schemas/schedule.schemas";

interface IScheduleRegister extends z.infer<typeof scheduleDataRegisterSchema> {}

export { IScheduleRegister };
