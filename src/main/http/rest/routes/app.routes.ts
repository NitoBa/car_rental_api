import { Router } from 'express';

import { accountRouter } from './account.routes';
import { categoryRouter } from './categories.routes';
import { specificationRouter } from './specification.routes';

const appRouter = Router();

appRouter.get('/', (_, res) => res.json({ message: 'API is available' }));

appRouter.use('/categories', categoryRouter);
appRouter.use('/specifications', specificationRouter);
appRouter.use('/account', accountRouter);

export { appRouter };
