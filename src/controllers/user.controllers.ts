import { Request, Response } from "express";
import { User } from "../entities";
import { IUserLog, IUserPrivate, IUserRegister } from "../interfaces/users.interfaces";
import { requestCreateUser, requestUpdateUser, requestDeleteUser, requestReadUsersList, logUser } from "../services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: IUserRegister = res.locals.data;
  const user = await requestCreateUser(payload);

  return res.status(201).json(user);
};

const getUserList = async (req: Request, res: Response): Promise<Response> => {
  const userList = await requestReadUsersList();

  return res.status(200).json(userList);
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: IUserPrivate = res.locals.data;
  const userFound: User = res.locals.user;
  const user = await requestUpdateUser(payload, userFound);

  return res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const payload = Number(req.params.id);

  await requestDeleteUser(payload);

  return res.status(204).send();
};

const sessionLogUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: IUserLog = res.locals.data;
  const token = await logUser(payload);

  return res.status(200).json({ token });
};

export { createUser, getUserList, updateUser, deleteUser, sessionLogUser };
