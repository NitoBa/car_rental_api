import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './docs/swagger.json';
import { appRouter } from './routes/routes';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(appRouter);

export { app };
