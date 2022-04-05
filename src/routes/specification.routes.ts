import { Router } from 'express';

import {
  createSpecificationController,
  getAllSpecificationsController,
  getSpecificationByIdController,
} from '../factories/specifications-factory';

const specificationRouter = Router();

specificationRouter.post('/', async (req, res) =>
  createSpecificationController().handle(req, res)
);
specificationRouter.get('/', async (req, res) =>
  getAllSpecificationsController().handle(req, res)
);
specificationRouter.get('/:id', async (req, res) =>
  getSpecificationByIdController().handle(req, res)
);

export { specificationRouter };
