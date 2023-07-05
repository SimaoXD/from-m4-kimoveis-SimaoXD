import { IRealEstateRegister, TController } from "../interfaces";
import { createPropriety, proprietyList } from "../services/realEstate.services";

const createProperty: TController = async (req, res) => {
  const payload: IRealEstateRegister = res.locals.data;
  const propriety = await createPropriety(payload);

  return res.status(201).json(propriety);
};

const getProprietyList: TController = async (req, res) => {
  const listPropriety = await proprietyList();

  return res.status(200).json(listPropriety);
};
export default { createProperty, getProprietyList };
