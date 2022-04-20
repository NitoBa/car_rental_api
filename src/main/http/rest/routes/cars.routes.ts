import { Router } from 'express';

import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRouter } from '../adapters/express-router-adapter';
import {
  createCarsController,
  createEnsureUserIsAdminMiddleware,
} from '../factories/cars-factory';

const carsRouter = Router();

carsRouter.post(
  '/',
  adaptMiddleware(createEnsureUserIsAdminMiddleware()),
  adaptRouter(createCarsController())
);

export { carsRouter };
