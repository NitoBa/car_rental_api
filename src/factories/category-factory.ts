import { CreateCategoryController } from '../application/usecases/createCategory/create-category-controller';
import { CreateCategoryUsecase } from '../application/usecases/createCategory/create-category-usecase';
import { GetAllCategoriesController } from '../application/usecases/getAllCategories/get-all-categories-controller';
import { GetAllCategoriesUsecase } from '../application/usecases/getAllCategories/get-all-categories-usecase';
import { UpdateCategoryController } from '../application/usecases/updateCategory/update-category-controller';
import { UpdateCategoryUsecase } from '../application/usecases/updateCategory/update-category-usecase';
import { CategoryRepository } from '../infra/repositories/category-repository';

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
