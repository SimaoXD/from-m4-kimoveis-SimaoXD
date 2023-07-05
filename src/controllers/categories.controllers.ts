import { requestCreateCategorie, requestCategoriesList, requestProprietyListCategory } from "../services";
import { ICategoryPublic, TController } from "../interfaces";

const createCategory: TController = async (req, res) => {
  const payload: ICategoryPublic = res.locals.data;
  const category = await requestCreateCategorie(payload);

  return res.status(201).json(category);
};

const getListCategory: TController = async (req, res) => {
  const listCategory: ICategoryPublic[] = await requestCategoriesList();

  return res.status(200).json(listCategory);
};

const getProprietyListCategory: TController = async (req, res) => {
  const proprietyList = await requestProprietyListCategory(req);

  return res.status(200).json(proprietyList);
};

export { createCategory, getListCategory, getProprietyListCategory };
