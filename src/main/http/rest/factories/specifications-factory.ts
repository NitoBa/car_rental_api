import { CreateSpecificationUsecase } from '../../../../application/usecases/createSpecification/create-specification-usecase';
import { GetAllSpecificationsUsecase } from '../../../../application/usecases/get-all-specifications-usecase';
import { GetSpecificationByIdUsecase } from '../../../../application/usecases/get-specification-by-id-usecase';
import { prisma } from '../../../../external/database/prisma-service';
import { SpecificationRepositoryPrisma } from '../../../../infra/repositories/specification-repository-prisma';
import { CreateSpecificationController } from '../../../../presentation/controllers/create-specification-controller';
import { GetAllSpecificationsController } from '../../../../presentation/controllers/get-all-specifications-controller';
import { GetSpecificationByIdController } from '../../../../presentation/controllers/get-specification-by-id-controller';

const repository = new SpecificationRepositoryPrisma(prisma);

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
