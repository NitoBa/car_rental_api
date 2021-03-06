import { Router } from 'express';

import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRouter } from '../adapters/express-router-adapter';
import { createEnsureAuthenticatedMiddleware } from '../factories/account-factory';
import {
  createDevolutionRentalController,
  createListUserRentalsController,
  createRentalController,
} from '../factories/rental-factory';

const rentalRouter = Router();

rentalRouter.post(
  '/',
  adaptMiddleware(createEnsureAuthenticatedMiddleware()),
  adaptRouter(createRentalController())
);

rentalRouter.post(
  '/devolution/:rentalId',
  adaptMiddleware(createEnsureAuthenticatedMiddleware()),
  adaptRouter(createDevolutionRentalController())
);

rentalRouter.get(
  '/',
  adaptMiddleware(createEnsureAuthenticatedMiddleware()),
  adaptRouter(createListUserRentalsController())
);

export { rentalRouter };
