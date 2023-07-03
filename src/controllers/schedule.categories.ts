const createSchedule: TController = async (req, res) => {
  const payload: IScheduleRegister = res.locals.data;
  const userId = Number(res.locals.userId);
  const schedule = await requestCreateSchedule(payload, userId);

  return res.status(201).json(schedule);
};

const getProprietyListSchedule: TController = async (req, res) => {
  const payload = Number(req.params.id);
  const scheduleList = await requestGetProprietySchedule(payload);

  return res.status(200).json(scheduleList);
};

export default { createSchedule, getProprietyListSchedule };
