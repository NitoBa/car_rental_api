import { CategoryRepository } from '../repositories/category-repository';
import { CreateCategoryController } from '../usecases/createCategory/create-category-controller';
import { CreateCategoryUsecase } from '../usecases/createCategory/create-category-usecase';
import { GetAllCategoriesController } from '../usecases/getAllCategories/get-all-categories-controller';
import { GetAllCategoriesUsecase } from '../usecases/getAllCategories/get-all-categories-usecase';
import { UpdateCategoryController } from '../usecases/updateCategory/update-category-controller';
import { UpdateCategoryUsecase } from '../usecases/updateCategory/update-category-usecase';

export const createCategoryController = () => {
  const repository = new CategoryRepository();
  const usecase = new CreateCategoryUsecase(repository);
  const controller = new CreateCategoryController(usecase);
  return controller;
};

export const createGetAllCategoriesController = () => {
  const repository = new CategoryRepository();
  const usecase = new GetAllCategoriesUsecase(repository);
  const controller = new GetAllCategoriesController(usecase);
  return controller;
};

export const updateAllCategoryController = () => {
  const repository = new CategoryRepository();
  const usecase = new UpdateCategoryUsecase(repository);
  const controller = new UpdateCategoryController(usecase);
  return controller;
};
