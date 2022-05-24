import { Router } from 'express';
import multer from 'multer';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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

accountRouter.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;

  const resetPasswordPage = readFileSync(
    resolve(
      `${__dirname}/../../../../presentation/views/reset-password-page.html`
    )
  ).toString('utf-8');

  return res
    .status(200)
    .send(resetPasswordPage.replace('{token}', token as string));
});

accountRouter.post(
  '/reset-password/:token',
  adaptRouter(createResetPasswordController())
);

export { accountRouter };
