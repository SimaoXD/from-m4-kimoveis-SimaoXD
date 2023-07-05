import { User } from "../entities";
import { TController } from "../interfaces/login.interfaces";
import { IUserLog, IUserPrivate, IUserRegister } from "../interfaces/users.interfaces";
import { requestCreateUser, requestUpdateUser, requestDeleteUser, requestReadUsersList, logUser } from "../services";

const createUser: TController = async (req, res) => {
  const payload: IUserRegister = res.locals.data;
  const user = await requestCreateUser(payload);

  return res.status(201).json(user);
};

const getUserList: TController = async (req, res) => {
  const userList = await requestReadUsersList();

  return res.status(200).json(userList);
};

const updateUser: TController = async (req, res) => {
  const payload: IUserPrivate = res.locals.data;
  const userFound: User = res.locals.user;
  const user = await requestUpdateUser(payload, userFound);

  return res.status(200).json(user);
};

const deleteUser: TController = async (req, res) => {
  const payload = Number(req.params.id);

  await requestDeleteUser(payload);

  return res.status(204).send();
};

const sessioLogUser: TController = async (req, res) => {
  const payload: IUserLog = res.locals.data;
  const token = await logUser(payload);

  return res.status(200).json({ token });
};

export { createUser, getUserList, updateUser, deleteUser, sessioLogUser };
