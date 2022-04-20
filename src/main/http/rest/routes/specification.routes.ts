import { Router } from 'express';

import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRouter } from '../adapters/express-router-adapter';
import { createEnsureUserIsAdminMiddleware } from '../factories/cars-factory';
import {
  createSpecificationCarController,
  createSpecificationController,
  getAllSpecificationsController,
  getSpecificationByIdController,
} from '../factories/specifications-factory';

const specificationRouter = Router();

specificationRouter.post('/', adaptRouter(createSpecificationController()));
specificationRouter.post(
  '/car',
  adaptMiddleware(createEnsureUserIsAdminMiddleware()),
  adaptRouter(createSpecificationCarController())
);
specificationRouter.get('/', adaptRouter(getAllSpecificationsController()));
specificationRouter.get('/:id', adaptRouter(getSpecificationByIdController()));

export { specificationRouter };
