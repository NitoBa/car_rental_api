import { SpecificationController } from '../controllers/specification-controller';
import { SpecificationRepository } from '../repositories/specification-repository';

export const createController = () => {
  const repository = new SpecificationRepository();
  const controller = new SpecificationController(repository);
  return controller;
};
