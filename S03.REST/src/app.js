import express from 'express';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import errors from './middlewares/errors.js';

import mathRoutes from './routes/math.routes.js';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm Z';
const app = express();


app.get('/html', (req, res) => {
  //Retourner le status
  res.status(200);
  //Le type de réponse
  res.set('Content-Type', 'text/html');
  // Envoi de la réponse
  res.send('<h1>Route en html</h1>');
});

app.get('/date', (req, res) => {

  res.status(200);
  res.set('Content-Type', 'text/plain');
  
  const dateNow = dayjs().format(DATETIME_FORMAT);
  const dateWithTimezone = dayjs.tz(dayjs(), 'Australia/Adelaide').format(DATETIME_FORMAT);
  res.send(dateWithTimezone);

});

app.get('/error', (req, res) => {
  res.status(418);
  res.set('Content-Type', 'text/plain');
  res.send('Erreur');
})

app.use('/math', mathRoutes);

app.use(errors);

export default app;
