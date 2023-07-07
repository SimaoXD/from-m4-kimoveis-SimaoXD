import { Request, Response } from "express";
import { TController, IScheduleRegister } from "../interfaces";
import { scheduleDataRegisterSchema } from "../schemas";
import { requestProrietyListSchedule, requestCreateSchedule } from "../services";

const createSchedule = async (req: Request, res: Response): Promise<Response> => {
  const payload: IScheduleRegister = res.locals.data;
  const userId = Number(res.locals.userId);
  const schedule = await requestCreateSchedule(payload, userId);

  return res.status(201).json(schedule);
};

const getProprietyListSchedule = async (req: Request, res: Response): Promise<Response> => {
  const payload = Number(req.params.id);
  const scheduleList = await requestProrietyListSchedule(payload);

  return res.status(200).json(scheduleList);
};

export { createSchedule, getProprietyListSchedule };
