import { Router } from 'express';

import { adaptRouter } from '../adapters/express-router-adapter';
import { createCreateUserController } from '../factories/account-factory';

const accountRouter = Router();

accountRouter.post('/users', adaptRouter(createCreateUserController()));

export { accountRouter };
