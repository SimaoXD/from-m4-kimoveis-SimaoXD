import { z } from "zod";

const userDataPublicSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  createAt: z.string(),
  updateAt: z.string(),
  deleteAt: z.string().nullish(),
});

const userListPublicSchema = userDataPublicSchema.extend({}).array();

const userDataRegisterSchema = userDataPublicSchema
  .omit({ id: true, createAt: true, updateAt: true, deleteAt: true })
  .extend({
    password: z.string().max(120),
  })
  .partial();

const userDataPrivateSchema = userDataRegisterSchema
  .omit({
    admin: true,
  })
  .partial();

const userDataLogSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().max(120),
});

export { userDataPublicSchema, userListPublicSchema, userDataRegisterSchema, userDataPrivateSchema, userDataLogSchema };
