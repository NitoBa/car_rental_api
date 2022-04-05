import { Router } from 'express';

import {
  createCategoryController,
  createGetAllCategoriesController,
  updateAllCategoryController,
} from '../factories/category-factory';

const categoryRouter = Router();

categoryRouter.get('/', async (req, res) =>
  createGetAllCategoriesController().handle(req, res)
);
categoryRouter.post('/', async (req, res) =>
  createCategoryController().handle(req, res)
);
categoryRouter.put('/:id', async (req, res) =>
  updateAllCategoryController().handle(req, res)
);

export { categoryRouter };
