import { Router } from 'express';

import { CategoryControllerFactory } from '../factories/category-controller-factory';

const categoryRouter = Router();

const controller = CategoryControllerFactory.create();

categoryRouter.post('/', controller.create);

export { categoryRouter };
