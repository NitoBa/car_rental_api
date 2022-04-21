import { Router } from 'express';

import { adaptRouter } from '../adapters/express-router-adapter';
import { createRentalController } from '../factories/rental-factory';

const rentalRouter = Router();

rentalRouter.post('/', adaptRouter(createRentalController()));

export { rentalRouter };
