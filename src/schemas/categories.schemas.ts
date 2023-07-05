import { z } from "zod";

const categoryDataPublicSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categoryDataRegisterSchema = categoryDataPublicSchema.omit({
  id: true,
});

export { categoryDataPublicSchema, categoryDataRegisterSchema };
