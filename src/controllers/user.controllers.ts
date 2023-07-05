import { TController } from "../interfaces/login.interfaces";
import { IUserRegister } from "../interfaces/users.interfaces";

const createUser: TController = async (req, res) => {
  const payload = (IUserRegister = res.locals.data);
  const user = await requestAnimationFrame.CreateUser(payload);

  return res.status(201).json(user);
};

const getUserList: TController = async (req, res) => {
  const userList = await requestGetUserList();

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
  const token = await requestLogUser(payload);

  return res.status(200).json({ token });
};

export default { createUser, getUserList, updateUser, deleteUser, sessioLogUser };
