import { Router } from 'express';

import { createController } from '../factories/specification-controller-factory';

const specificationRouter = Router();

const controller = createController();

specificationRouter.post('/', async (req, res) => controller.create(req, res));
specificationRouter.get('/', async (req, res) => controller.index(req, res));

export { specificationRouter };
