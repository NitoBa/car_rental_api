import { Router } from 'express';
import multer from 'multer';

import upload from '../../../config/upload';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRouter } from '../adapters/express-router-adapter';
import {
  createAuthenticateUserController,
  createCreateUserController,
  createEnsureAuthenticatedMiddleware,
  createResetPasswordController,
  createSendForgotPasswordEmailController,
  createUpdateUserAvatarController,
} from '../factories/account-factory';

const accountRouter = Router();

const uploadAvatar = multer(upload.upload('./tmp/avatar'));

accountRouter.post('/users', adaptRouter(createCreateUserController()));
accountRouter.post(
  '/users/session',
  adaptRouter(createAuthenticateUserController())
);

accountRouter.patch(
  '/users/update-avatar',
  adaptMiddleware(createEnsureAuthenticatedMiddleware()),
  uploadAvatar.single('avatar'),
  adaptRouter(createUpdateUserAvatarController())
);

accountRouter.post(
  '/forgot-password',
  adaptRouter(createSendForgotPasswordEmailController())
);

accountRouter.post(
  '/reset-password',
  adaptRouter(createResetPasswordController())
);

export { accountRouter };
