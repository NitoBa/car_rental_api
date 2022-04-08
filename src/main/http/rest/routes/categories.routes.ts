import { Router } from 'express';

import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRouter } from '../adapters/express-router-adapter';
import { createEnsureAuthenticatedMiddleware } from '../factories/account-factory';
import {
  createCategoryController,
  createGetAllCategoriesController,
  importCategoryController,
  updateAllCategoryController,
} from '../factories/category-factory';
import { handleUploadFile } from '../middlewares/handle-upload-file';

const categoryRouter = Router();

categoryRouter.get('/', adaptRouter(createGetAllCategoriesController()));
categoryRouter.post(
  '/',
  adaptMiddleware(createEnsureAuthenticatedMiddleware()),
  adaptRouter(createCategoryController())
);
categoryRouter.put('/:id', adaptRouter(updateAllCategoryController()));

categoryRouter.post(
  '/import',
  handleUploadFile,
  adaptRouter(importCategoryController())
);
export { categoryRouter };
