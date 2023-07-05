import { z } from "zod";

const scheduleDataRegisterSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int().positive(),
});

export { scheduleDataRegisterSchema };
