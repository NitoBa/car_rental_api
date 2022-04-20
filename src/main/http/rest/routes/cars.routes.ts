import { Router } from 'express';
import multer from 'multer';

import upload from '../../../config/upload';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { adaptRouter } from '../adapters/express-router-adapter';
import {
  createCarsController,
  createEnsureUserIsAdminMiddleware,
  createGetAllAvailableCarsController,
  createUploadCarImagesController,
} from '../factories/cars-factory';

const carsRouter = Router();
const uploadCarImages = multer(upload.upload('./tmp/CarImages'));

carsRouter.post(
  '/',
  adaptMiddleware(createEnsureUserIsAdminMiddleware()),
  adaptRouter(createCarsController())
);

carsRouter.get('/', adaptRouter(createGetAllAvailableCarsController()));

carsRouter.post(
  '/upload-images/:id',
  adaptMiddleware(createEnsureUserIsAdminMiddleware()),
  uploadCarImages.array('images', 10),
  adaptRouter(createUploadCarImagesController())
);

export { carsRouter };
