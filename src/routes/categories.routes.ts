import { Router } from 'express';

import { CategoryController } from '../controllers/category-controller';
import { CategoryRepository } from '../repositories/category-repository';

const categoryRouter = Router();

const categoryRepository = new CategoryRepository();
const controller = new CategoryController(categoryRepository);

categoryRouter.post('/', controller.create);

export { categoryRouter };
