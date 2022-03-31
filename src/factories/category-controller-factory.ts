import { CategoryController } from '../controllers/category-controller';
import { CategoryRepository } from '../repositories/category-repository';

export class CategoryControllerFactory {
  static create() {
    const categoryRepository = new CategoryRepository();
    const controller = new CategoryController(categoryRepository);
    return controller;
  }
}
