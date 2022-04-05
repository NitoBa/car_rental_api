import { CreateSpecificationUsecase } from '../../application/usecases/create-specification-usecase';
import { GetAllSpecificationsUsecase } from '../../application/usecases/get-all-specifications-usecase';
import { GetSpecificationByIdUsecase } from '../../application/usecases/get-specification-by-id-usecase';
import { SpecificationRepository } from '../../infra/repositories/specification-repository';
import { CreateSpecificationController } from '../../presentation/create-specification-controller';
import { GetAllSpecificationsController } from '../../presentation/get-all-specifications-controller';
import { GetSpecificationByIdController } from '../../presentation/get-specification-by-id-controller';

export const createSpecificationController = () => {
  const repository = new SpecificationRepository();
  const usecase = new CreateSpecificationUsecase(repository);
  const controller = new CreateSpecificationController(usecase);
  return controller;
};

export const getAllSpecificationsController = () => {
  const repository = new SpecificationRepository();
  const usecase = new GetAllSpecificationsUsecase(repository);
  const controller = new GetAllSpecificationsController(usecase);
  return controller;
};

export const getSpecificationByIdController = () => {
  const repository = new SpecificationRepository();
  const usecase = new GetSpecificationByIdUsecase(repository);
  const controller = new GetSpecificationByIdController(usecase);
  return controller;
};
