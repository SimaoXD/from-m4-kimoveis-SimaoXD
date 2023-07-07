import { z } from "zod";

const userDataPublicSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),

  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userListPublicSchema = userDataPublicSchema.extend({}).array();

const userDataRegisterSchema = userDataPublicSchema.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true }).extend({
  password: z.string().max(120),
});

const userDataPrivateSchema = userDataRegisterSchema
  .omit({
    admin: true,
  })
  .partial();

const userDataLogSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().max(120),
});

// const userDataLogSchema = userDataRegisterSchema.pick({
//   email: true,
//   password: true,
// });

export { userDataPublicSchema, userListPublicSchema, userDataRegisterSchema, userDataPrivateSchema, userDataLogSchema };
