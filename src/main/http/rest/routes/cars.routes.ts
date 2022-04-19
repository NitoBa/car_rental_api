import { Router } from 'express';

import { adaptRouter } from '../adapters/express-router-adapter';
import { createCarsController } from '../factories/cars-factory';

const carsRouter = Router();

carsRouter.post('/', adaptRouter(createCarsController()));

export { carsRouter };
