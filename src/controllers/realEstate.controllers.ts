import { Request, Response } from "express";
import { IRealEstateRegister, TController } from "../interfaces";
import { requestCreatePropriety, requestProprietyList } from "../services/realEstate.services";

const createProperty = async (req: Request, res: Response): Promise<Response> => {
  const payload: IRealEstateRegister = res.locals.data;
  const propriety = await requestCreatePropriety(payload);

  return res.status(201).json(propriety);
};

const getProprietyList = async (req: Request, res: Response): Promise<Response> => {
  const listPropriety = await requestProprietyList();

  return res.status(200).json(listPropriety);
};

export { createProperty, getProprietyList };
