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
categoryRouter.put('/:id', (req, res) =>
  updateAllCategoryController().handle(req, res)
);

categoryRouter.post('/import', handleUploadFile, (req, res) =>
  importCategoryController().handle(req, res)
);
export { categoryRouter };
