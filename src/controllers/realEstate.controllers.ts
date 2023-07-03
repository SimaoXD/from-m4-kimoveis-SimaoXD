const createProperty: TController = async (req, res) => {
  const payload = (IRealEstateRegister = res.locals.data);
  const propriety = await requestCreatePropriety(payload);

  return res.status(201).json(propriety);
};

const getProprietyList: TController = async (req, res) => {
  const listPropriety = await requestProprietyList();

  return res.status(200).json(listPropriety);
};
export default { createProperty, getProprietyList };
