import { Request, Response } from "express";
import { requestCreateCategorie, requestCategoriesList, requestProprietyListCategory } from "../services";
import { ICategoryPublic } from "../interfaces";

const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const payload: ICategoryPublic = res.locals.data;
  const category = await requestCreateCategorie(payload);

  return res.status(201).json(category);
};

const getListCategory = async (req: Request, res: Response): Promise<Response> => {
  const listCategory: ICategoryPublic[] = await requestCategoriesList();

  return res.status(200).json(listCategory);
};

const getProprietyListCategory = async (req: Request, res: Response): Promise<Response> => {
  const proprietyList = await requestProprietyListCategory(req);

  return res.status(200).json(proprietyList);
};

export { createCategory, getListCategory, getProprietyListCategory };
