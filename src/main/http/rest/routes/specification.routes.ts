import { Router } from 'express';

import { adaptRouter } from '../adapters/express-router-adapter';
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
  adaptRouter(createSpecificationCarController())
);
specificationRouter.get('/', adaptRouter(getAllSpecificationsController()));
specificationRouter.get('/:id', adaptRouter(getSpecificationByIdController()));

export { specificationRouter };
