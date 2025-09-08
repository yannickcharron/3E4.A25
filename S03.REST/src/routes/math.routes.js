import { Router } from 'express';
import HttpError from 'http-errors';

const router = Router();

router.get('/:operation', (req, res) => {
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

router.get('/conversions/:base', (req, res, next) => {

    const base = req.params.base;
    const number = parseInt(req.query.number, 10);

    //Valider que nombre soit un nombre
    if(typeof number !== "number" || isNaN(number)) {
        return next(HttpError.BadRequest('Not a number'));
    }
 
    let result = 0;
    switch(base) {
        case 'hex':
            result = number.toString(16);
            break;
        case 'binary':
            result = number.toString(2);
            break;
        default:
            return next(HttpError.BadRequest('Invalid base'));
    }

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(result);

});

function sendError(res, status, msg) {
    res.set('Content-Type', 'text/plain');
    res.status(status);
    res.send(msg);
}

export default router;