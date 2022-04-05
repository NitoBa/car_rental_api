import { Router } from 'express';

import {
  createCategoryController,
  createGetAllCategoriesController,
  importCategoryController,
  updateAllCategoryController,
} from '../factories/category-factory';
import { handleUploadFile } from '../middlewares/handle-upload-file';

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

categoryRouter.post('/import', handleUploadFile, (req, res) =>
  importCategoryController().handle(req, res)
);
export { categoryRouter };
