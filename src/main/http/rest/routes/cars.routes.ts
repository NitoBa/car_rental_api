import { Router } from 'express';

import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRouter } from '../adapters/express-router-adapter';
import { createEnsureAuthenticatedMiddleware } from '../factories/account-factory';
import { createCarsController } from '../factories/cars-factory';

const carsRouter = Router();

carsRouter.post(
  '/',
  adaptMiddleware(createEnsureAuthenticatedMiddleware()),
  adaptRouter(createCarsController())
);

export { carsRouter };
