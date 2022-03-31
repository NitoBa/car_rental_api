import { Router } from 'express';

import { createController } from '../factories/category-controller-factory';

const categoryRouter = Router();
const controller = createController();

categoryRouter.post('/', async (req, res) => controller.create(req, res));

export { categoryRouter };
