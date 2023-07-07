import { z } from "zod";
import { categoryDataPublicSchema, categoryDataRegisterSchema } from "../schemas/categories.schemas";

interface ICategoryPublic extends z.infer<typeof categoryDataPublicSchema> {}
interface ICategoryRegister extends z.infer<typeof categoryDataRegisterSchema> {}
export { ICategoryPublic, ICategoryRegister };
