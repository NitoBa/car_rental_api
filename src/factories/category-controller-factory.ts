import { CategoryController } from '../controllers/category-controller';
import { CategoryRepository } from '../repositories/category-repository';

export const createController = () => {
  const repository = new CategoryRepository();
  const controller = new CategoryController(repository);
  return controller;
};
