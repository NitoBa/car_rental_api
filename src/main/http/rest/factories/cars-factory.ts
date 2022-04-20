import { CreateCarUseCase } from '../../../../application/usecases/createCar/create-car-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { CarsRepositoryPrisma } from '../../../../infra/repositories/cars-repository-prisma';
import { CategoryRepositoryPrisma } from '../../../../infra/repositories/category-repository-prisma';
import { JwtRepository } from '../../../../infra/repositories/jwt-repository';
import { UsersRepositoryPrisma } from '../../../../infra/repositories/users-repository-prisma';
import { CreateCarsController } from '../../../../presentation/controllers/create-cars-controller';
import { EnsureUserIsAdminMiddleware } from '../middlewares/ensure-user-is-admin';

const carsRepository = new CarsRepositoryPrisma(prisma);
const categoryRepository = new CategoryRepositoryPrisma(prisma);
const jwtRepository = new JwtRepository();
const usersRepository = new UsersRepositoryPrisma(prisma);

export const createEnsureUserIsAdminMiddleware = () => {
  return new EnsureUserIsAdminMiddleware(jwtRepository, usersRepository);
};

export const createCarsController = () => {
  const usecase = new CreateCarUseCase(carsRepository, categoryRepository);
  return new CreateCarsController(usecase);
};
