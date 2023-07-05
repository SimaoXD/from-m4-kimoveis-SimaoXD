import { z } from "zod";
import { realEstateDataPublicSchema, realEstateDataRegisterSchema } from "../schemas/realEstate.schemas";

interface IRealEstatePublic extends z.infer<typeof realEstateDataPublicSchema> {}
interface IRealEstateRegister extends z.infer<typeof realEstateDataRegisterSchema> {}

export { IRealEstatePublic, IRealEstateRegister };
