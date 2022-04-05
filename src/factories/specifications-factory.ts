import { CreateSpecificationController } from '../application/usecases/createSpecification/create-specification-controller';
import { CreateSpecificationUsecase } from '../application/usecases/createSpecification/create-specification-usecase';
import { GetAllSpecificationsController } from '../application/usecases/getAllSpecifications/get-all-specifications-controller';
import { GetAllSpecificationsUsecase } from '../application/usecases/getAllSpecifications/get-all-specifications-usecase';
import { GetSpecificationByIdController } from '../application/usecases/getSpecificationById/get-specification-by-id-controller';
import { GetSpecificationByIdUsecase } from '../application/usecases/getSpecificationById/get-specification-by-id-usecase';
import { SpecificationRepository } from '../infra/repositories/specification-repository';

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
