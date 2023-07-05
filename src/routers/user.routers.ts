import { Router } from "express";
import { verifyDataBody, verifyEmailExists, verifyUserExists } from "../middlewares/verify.middlewares";
import { userDataPrivateSchema, userDataRegisterSchema } from "../schemas";
import { createUser, deleteUser, getUserList, updateUser } from "../controllers";
import { verifyTokenUser, verifyUserAdmin } from "../middlewares/user.middlewares";

const userRouter = Router();

userRouter.post("", verifyEmailExists, verifyDataBody(userDataRegisterSchema), createUser);
userRouter.get("", verifyTokenUser, verifyUserAdmin, getUserList);
userRouter.patch("/:id", verifyUserExists, verifyTokenUser, verifyEmailExists, verifyDataBody(userDataPrivateSchema), updateUser);
userRouter.delete("/:id", verifyUserExists, verifyTokenUser, verifyUserAdmin, deleteUser);

export { userRouter };
