import express from 'express';

import { categoryRouter } from './routes/categories.routes';

const app = express();

app.use(express.json());

// routes
app.use(categoryRouter);

export { app };
