import { Router } from 'express';

import {
  createCategoryController,
  createGetAllCategoriesController,
  updateAllCategoryController,
} from '../factories/category-factory';

const categoryRouter = Router();

categoryRouter.get('/', (req, res) =>
  createGetAllCategoriesController().handle(req, res)
);
categoryRouter.post('/', (req, res) =>
  createCategoryController().handle(req, res)
);
categoryRouter.put('/:id', (req, res) =>
  updateAllCategoryController().handle(req, res)
);

export { categoryRouter };
