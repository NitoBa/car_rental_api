import { Router } from 'express';

import { adaptRouter } from '../adapters/express-router-adapter';
import {
  createSpecificationController,
  getAllSpecificationsController,
  getSpecificationByIdController,
} from '../factories/specifications-factory';

const specificationRouter = Router();

specificationRouter.post('/', adaptRouter(createSpecificationController()));
specificationRouter.get('/', adaptRouter(getAllSpecificationsController()));
specificationRouter.get('/:id', (req, res) =>
  getSpecificationByIdController().handle(req, res)
);

export { specificationRouter };
