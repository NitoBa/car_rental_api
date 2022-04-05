import { SpecificationRepository } from '../repositories/specification-repository';
import { CreateSpecificationController } from '../usecases/createSpecification/create-specification-controller';
import { CreateSpecificationUsecase } from '../usecases/createSpecification/create-specification-usecase';
import { GetAllSpecificationsController } from '../usecases/getAllSpecifications/get-all-specifications-controller';
import { GetAllSpecificationsUsecase } from '../usecases/getAllSpecifications/get-all-specifications-usecase';
import { GetSpecificationByIdController } from '../usecases/getSpecificationById/get-specification-by-id-controller';
import { GetSpecificationByIdUsecase } from '../usecases/getSpecificationById/get-specification-by-id-usecase';

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
