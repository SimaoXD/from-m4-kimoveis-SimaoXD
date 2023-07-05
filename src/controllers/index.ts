import { createCategory, getListCategory, getProprietyListCategory } from "./categories.controllers";
import { createProperty, getProprietyList } from "./realEstate.controllers";
import { createSchedule, getProprietyListSchedule } from "./schedule.categories";
import { createUser, getUserList, updateUser, deleteUser, sessioLogUser } from "./user.controllers";

export {
  createCategory,
  getListCategory,
  getProprietyListCategory,
  createProperty,
  getProprietyList,
  createSchedule,
  getProprietyListSchedule,
  createUser,
  getUserList,
  updateUser,
  deleteUser,
  sessioLogUser,
};
