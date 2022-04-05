import { Router } from 'express';

import {
  createSpecificationController,
  getAllSpecificationsController,
  getSpecificationByIdController,
} from '../factories/specifications-factory';

const specificationRouter = Router();

specificationRouter.post('/', (req, res) =>
  createSpecificationController().handle(req, res)
);
specificationRouter.get('/', (req, res) =>
  getAllSpecificationsController().handle(req, res)
);
specificationRouter.get('/:id', (req, res) =>
  getSpecificationByIdController().handle(req, res)
);

export { specificationRouter };
