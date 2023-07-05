import { Repository } from "typeorm";
import { Request } from "express";
import { ICategoryPublic, ICategoryRegister } from "../interfaces/category.interfaces";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { TService } from "../interfaces/login.interfaces";
import { categoryDataPublicSchema } from "../schemas/categories.schemas";
import AppError from "../errors/AppError";

const requestCreateCategorie: TService<ICategoryPublic, ICategoryRegister> = async (payload) => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const categorie = categoryRepo.create(payload);

  await categoryRepo.save(categorie);

  return categoryDataPublicSchema.parse(categorie);
};

const requestCategoriesList = async (): Promise<ICategoryPublic[]> => {
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);
  const category = await categoryRepo.find();

  return category;
};

const requestProprietyListCategory: TService<Category, Request> = async (payload) => {
  const id = Number(payload.params.id);
  const realEstateRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const proprietyList = await realEstateRepo
    .createQueryBuilder("category")
    .select()
    .innerJoinAndSelect("category.realEstate", "propriety")
    .where("category.id = :categoryId", { categoryId: id })
    .getOne();

  if (!proprietyList) throw new AppError("Category not found", 404);

  return proprietyList;
};

export { requestCreateCategorie, requestCategoriesList, requestProprietyListCategory };
