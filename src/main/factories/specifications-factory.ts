import { CreateSpecificationUsecase } from '../../application/usecases/create-specification-usecase';
import { GetAllSpecificationsUsecase } from '../../application/usecases/get-all-specifications-usecase';
import { GetSpecificationByIdUsecase } from '../../application/usecases/get-specification-by-id-usecase';
import { SpecificationRepository } from '../../infra/repositories/specification-repository';
import { CreateSpecificationController } from '../../presentation/create-specification-controller';
import { GetAllSpecificationsController } from '../../presentation/get-all-specifications-controller';
import { GetSpecificationByIdController } from '../../presentation/get-specification-by-id-controller';

const repository = new SpecificationRepository();

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
