import { ProprietyListCategory, categoriesList, createCategorie } from "../services/categories.services";
import { ICategoryPublic, TController } from "../interfaces";

const createCategory: TController = async (req, res) => {
  const payload: ICategoryPublic = res.locals.data;
  const category = await createCategorie(payload);

  return res.status(201).json(category);
};

const getListCategory: TController = async (req, res) => {
  const listCategory: ICategoryPublic[] = await categoriesList();

  return res.status(200).json(listCategory);
};

const getProprietyListCategory: TController = async (req, res) => {
  const proprietyList = await ProprietyListCategory(req);

  return res.status(200).json(proprietyList);
};

export default { createCategory, getListCategory, getProprietyListCategory };
