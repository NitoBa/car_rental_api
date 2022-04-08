import { CreateCategoryUsecase } from '../../../../application/usecases/create-category-usecase';
import { GetAllCategoriesUsecase } from '../../../../application/usecases/get-all-categories-usecase';
import { ImportCategoryUsecase } from '../../../../application/usecases/import-category-usecase';
import { UpdateCategoryUsecase } from '../../../../application/usecases/update-category-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { CategoryRepositoryPrisma } from '../../../../infra/repositories/category-repository-prisma';
import { CreateCategoryController } from '../../../../presentation/controllers/create-category-controller';
import { GetAllCategoriesController } from '../../../../presentation/controllers/get-all-categories-controller';
import { ImportCategory } from '../../../../presentation/controllers/import-category-controller';
import { UpdateCategoryController } from '../../../../presentation/controllers/update-category-controller';

const repository = new CategoryRepositoryPrisma(prisma);

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
