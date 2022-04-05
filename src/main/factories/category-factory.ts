import { CreateCategoryUsecase } from '../../application/usecases/create-category-usecase';
import { GetAllCategoriesUsecase } from '../../application/usecases/get-all-categories-usecase';
import { ImportCategoryUsecase } from '../../application/usecases/import-category-usecase';
import { UpdateCategoryUsecase } from '../../application/usecases/update-category-usecase';
import { CategoryRepository } from '../../infra/repositories/category-repository';
import { CreateCategoryController } from '../../presentation/create-category-controller';
import { GetAllCategoriesController } from '../../presentation/get-all-categories-controller';
import { ImportCategory } from '../../presentation/import-category-controller';
import { UpdateCategoryController } from '../../presentation/update-category-controller';

const repository = new CategoryRepository();

export const createCategoryController = () => {
  const usecase = new CreateCategoryUsecase(repository);
  return new CreateCategoryController(usecase);
};

export const createGetAllCategoriesController = () => {
  const usecase = new GetAllCategoriesUsecase(repository);
  return new GetAllCategoriesController(usecase);
};

export const updateAllCategoryController = () => {
  const usecase = new UpdateCategoryUsecase(repository);
  return new UpdateCategoryController(usecase);
};

export const importCategoryController = () => {
  const usecase = new ImportCategoryUsecase(repository);
  return new ImportCategory(usecase);
};
