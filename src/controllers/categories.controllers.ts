import { ICategoryPublic, ICategoryPublic } from "../interfaces/category.interfaces";
import { TController } from "../interfaces/login.interfaces";

const createCategory: TController = async (request, response) => {
  const payload = (ICategoryPublic = response.locals.data);
  const category = await requestCreate(payload);

  return response.status(201).json(category);
};

const getListCategory: TController = async (req, res) => {
  const listCategory: ICategoryPublic[] = await requestCategoriesList();

  return res.status(200).json(listCategory);
};

const getProprietyListCategory: TController = async (req, res) => {
  const proprietyList = await requestProprietyListCategory(req);

  return res.status(200).json(proprietyList);
};

export default { createCategory, getListCategory, getProprietyListCategory };
