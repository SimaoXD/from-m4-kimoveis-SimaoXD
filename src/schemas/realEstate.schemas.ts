import { z } from "zod";

const realEstateDataPublicSchema = z.object({
  id: z.number(),
  sold: z.boolean(),
  value: z.number().positive().or(z.string()),
  size: z.number().int().positive(),
  createAt: z.string(),
  updateAt: z.string(),
  address: z.object({
    id: z.string(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  category: z.object({
    id: z.number().int(),
    name: z.string(),
  }),
});

const realEstateDataRegisterSchema = realEstateDataPublicSchema
  .pick({
    value: true,
    size: true,
  })
  .extend({
    address: z.object({
      street: z.string().max(45),
      zipCode: z.string().max(8),
      number: z.string().max(7).nullish(),
      city: z.string().max(20),
      state: z.string().max(2),
    }),
    categoryId: z.number().int(),
  });

const realEstateDataPrivateSchema = realEstateDataPublicSchema

  .omit({
    id: true,
    createAt: true,
    updateAt: true,
    sold: true,
  })
  .partial();

export { realEstateDataPublicSchema, realEstateDataRegisterSchema, realEstateDataPrivateSchema };
