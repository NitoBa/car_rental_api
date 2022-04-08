import { Router } from 'express';

import { adaptRouter } from '../adapters/express-router-adapter';
import {
  createAuthenticateUserController,
  createCreateUserController,
} from '../factories/account-factory';

const accountRouter = Router();

accountRouter.post('/users', adaptRouter(createCreateUserController()));
accountRouter.post(
  '/users/session',
  adaptRouter(createAuthenticateUserController())
);

export { accountRouter };
