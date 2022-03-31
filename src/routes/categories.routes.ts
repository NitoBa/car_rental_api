import { Router } from 'express';

import { CategoryController } from '../controllers/category-controller';

const categoryRouter = Router();

const controller = new CategoryController();

categoryRouter.post('/', controller.create);

export { categoryRouter };
