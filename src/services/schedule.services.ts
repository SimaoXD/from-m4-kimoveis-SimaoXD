import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User, RealEstate, Schedule } from "../entities";
import { IScheduleRegister } from "../interfaces/schedules.interfaces";
import { TService } from "../interfaces/login.interfaces";
import AppError from "../errors/AppError";

const requestCreateSchedule = async (payload: IScheduleRegister, userId: number): Promise<{ message: string }> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule);

  const schedulesPropriety = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.realEstate = :realEstateId", {
      realEstateId: payload.realEstateId,
    })
    .andWhere("schedule.hour = :hour", { hour: payload.hour })
    .andWhere("schedule.date = :date", { date: payload.date })
    .getOne();
  if (schedulesPropriety) throw new AppError("Schedule to this real estate at this date and time already exists", 409);

  const timeReserved: string = payload.hour.split(":")[0];

  if (timeReserved < "08" || timeReserved > "18") throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  const dateReserved = new Date(payload.date).getDay();

  if (dateReserved > 4) throw new AppError("Invalid date, work days are monday to friday", 400);

  const user = await userRepo.findOneBy({ id: userId });

  if (!user) throw new AppError("user not found", 404);

  const propriety = await realEstateRepo.findOneBy({
    id: payload.realEstateId,
  });

  if (!propriety) throw new AppError("RealEstate not found", 404);

  const shedulesuser = await scheduleRepo
    .createQueryBuilder("schedule")
    .where("schedule.user = :userId", { userId })
    .andWhere("schedule.hour = :hour", { hour: payload.hour })
    .andWhere("schedule.date = :date", { date: payload.date })
    .getOne();

  if (shedulesuser) throw new AppError("User schedule to this real estate at this time already exists", 409);

  const schedule = scheduleRepo.create({
    ...payload,
    user: user,
    realEstate: propriety,
  });

  await scheduleRepo.save(schedule);

  return { message: "Schedule created" };
};

const requestProrietyListSchedule: TService<RealEstate, number> = async (payload) => {
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const realEstate = await realEstateRepo
    .createQueryBuilder("propriety")
    .leftJoinAndSelect("propriety.schedules", "schedules")
    .innerJoinAndSelect("schedule.user", "user")
    .leftJoinAndSelect("propriety.category", "category")
    .leftJoinAndSelect("propriety.address", "address")
    .where("propriety.id = :id", { id: payload })
    .getOne();

  if (!realEstate) throw new AppError(" RealEstate not found", 404);

  return realEstate;
};

export { requestCreateSchedule, requestProrietyListSchedule };
