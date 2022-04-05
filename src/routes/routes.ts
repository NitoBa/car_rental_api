import { Router } from 'express';

import { categoryRouter } from './categories.routes';
import { specificationRouter } from './specification.routes';

const appRouter = Router();

appRouter.use('/categories', categoryRouter);
appRouter.use('/specification', specificationRouter);

export { appRouter };
