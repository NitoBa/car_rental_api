import { CreateCarUseCase } from '../../../../application/usecases/createCar/create-car-usecase';
import { GetAllAvailableCarsUsecase } from '../../../../application/usecases/getAllAvailableCars/get-all-available-cars';
import { UploadCarImageUsecase } from '../../../../application/usecases/uploadCarImage/upload-car-image-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { CarImagesRepositoryPrisma } from '../../../../infra/repositories/car-images-repository-prisma';
import { CarsRepositoryPrisma } from '../../../../infra/repositories/cars-repository-prisma';
import { CategoryRepositoryPrisma } from '../../../../infra/repositories/category-repository-prisma';
import { JwtRepository } from '../../../../infra/repositories/jwt-repository';
import { UsersRepositoryPrisma } from '../../../../infra/repositories/users-repository-prisma';
import { CreateCarsController } from '../../../../presentation/controllers/create-cars-controller';
import { GetAllAvailableCarsController } from '../../../../presentation/controllers/get-all-available-cars-controller';
import { UploadCarImagesController } from '../../../../presentation/controllers/upload-car-images-controller';
import { EnsureUserIsAdminMiddleware } from '../middlewares/ensure-user-is-admin';

const carsRepository = new CarsRepositoryPrisma(prisma);
const categoryRepository = new CategoryRepositoryPrisma(prisma);
const carImagesRepository = new CarImagesRepositoryPrisma(prisma);
const jwtRepository = new JwtRepository();
const usersRepository = new UsersRepositoryPrisma(prisma);

export const createEnsureUserIsAdminMiddleware = () => {
  return new EnsureUserIsAdminMiddleware(jwtRepository, usersRepository);
};

export const createCarsController = () => {
  const usecase = new CreateCarUseCase(carsRepository, categoryRepository);
  return new CreateCarsController(usecase);
};

export const createGetAllAvailableCarsController = () => {
  const usecase = new GetAllAvailableCarsUsecase(carsRepository);
  return new GetAllAvailableCarsController(usecase);
};

export const createUploadCarImagesController = () => {
  const usecase = new UploadCarImageUsecase(
    carImagesRepository,
    carsRepository
  );

  return new UploadCarImagesController(usecase);
};
