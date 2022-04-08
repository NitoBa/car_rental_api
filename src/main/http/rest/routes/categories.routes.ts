import { Router } from 'express';

import { adaptRouter } from '../adapters/express-router-adapter';
import {
  createCategoryController,
  createGetAllCategoriesController,
  importCategoryController,
  updateAllCategoryController,
} from '../factories/category-factory';
import { handleUploadFile } from '../middlewares/handle-upload-file';

const categoryRouter = Router();

categoryRouter.get('/', adaptRouter(createGetAllCategoriesController()));
categoryRouter.post('/', adaptRouter(createCategoryController()));
categoryRouter.put('/:id', adaptRouter(updateAllCategoryController()));

categoryRouter.post(
  '/import',
  handleUploadFile,
  adaptRouter(importCategoryController())
);
export { categoryRouter };
