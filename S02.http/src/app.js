import express from 'express';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc);
dayjs.extend(timezone);

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm Z'
const app = express();


app.get('/html', (req, res) => {
  //Retourner le status
  res.status(200);
  //Le type de réponse
  res.set('Content-Type', 'text/html');
  // Envoi de la réponse
  res.send('<h1>Route en html</h1>');
});

app.get('/math/:operation', (req, res) => {
  const number1 = parseInt(req.query.number1, 10);
  const number2 = parseInt(req.query.number2, 10);

  const operation = req.params.operation

  let result = 0;
  switch (operation) {
    case 'somme':
      result = number1 + number2;
      break;
    case 'difference':
      result = number1 - number2;
      break;
    case 'produit':
      result = number1 * number2;
      break;
    case 'quotient':
      result = number1 / number2;
      break;
    case 'reste':
      result = number1 % number2;
      break;

  }

  res.status(200);
  res.set('Content-Type', 'text/plain');
  res.send(result);
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

app.get('/math/conversions/:base', (req, res) => {

  //base (binaire ou hex)
  //?number

});

export default app;
