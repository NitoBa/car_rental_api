import { CreateSpecificationUsecase } from '../../../../application/usecases/createSpecification/create-specification-usecase';
import { CreateSpecificationCarUseCase } from '../../../../application/usecases/createSpecificationCar/create-specification-car-usecase';
import { GetAllSpecificationsUsecase } from '../../../../application/usecases/GetAllSpecifications/get-all-specifications-usecase';
import { GetSpecificationByIdUsecase } from '../../../../application/usecases/GetSpecificationById/get-specification-by-id-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { CarsRepositoryPrisma } from '../../../../infra/repositories/cars-repository-prisma';
import { SpecificationRepositoryPrisma } from '../../../../infra/repositories/specification-repository-prisma';
import { SpecificationsCarsRepository } from '../../../../infra/repositories/specifications-car-repository';
import { CreateSpecificationCarController } from '../../../../presentation/controllers/create-specification-car-controller';
import { CreateSpecificationController } from '../../../../presentation/controllers/create-specification-controller';
import { GetAllSpecificationsController } from '../../../../presentation/controllers/get-all-specifications-controller';
import { GetSpecificationByIdController } from '../../../../presentation/controllers/get-specification-by-id-controller';

const repository = new SpecificationRepositoryPrisma(prisma);
const carRepository = new CarsRepositoryPrisma(prisma);

export const createSpecificationController = () => {
  const usecase = new CreateSpecificationUsecase(repository);
  return new CreateSpecificationController(usecase);
};

export const getAllSpecificationsController = () => {
  const usecase = new GetAllSpecificationsUsecase(repository);
  return new GetAllSpecificationsController(usecase);
};

export const getSpecificationByIdController = () => {
  const usecase = new GetSpecificationByIdUsecase(repository);
  return new GetSpecificationByIdController(usecase);
};

export const createSpecificationCarController = () => {
  const specificationCarRepository = new SpecificationsCarsRepository(prisma);
  const usecase = new CreateSpecificationCarUseCase(
    repository,
    carRepository,
    specificationCarRepository
  );
  return new CreateSpecificationCarController(usecase);
};
