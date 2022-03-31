import { Router } from 'express';

import { categoryRouter } from './categories.routes';

const appRouter = Router();

appRouter.use('/categories', categoryRouter);

export { appRouter };
