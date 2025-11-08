import express from 'express';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import planetsRouter from './routes/planets.routes.js';
import explorersRouter from './routes/explorers.routes.js';
import explorationsRouter from './routes/explorations.routes.js';

import database from './core/database.js';
import errorsMiddleware from './middlewares/errors.js';

database();

dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).end();
});

app.use('/planets', planetsRouter);
app.use('/explorers', explorersRouter);
app.use('/explorations', explorationsRouter);
//Si d'autres routers les mettre avant le middleware de gestion d'error

app.use(errorsMiddleware);

export default app;