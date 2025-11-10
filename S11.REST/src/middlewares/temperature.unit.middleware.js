import HttpError from 'http-errors';
export function handleUnitParam(req, res, next) {

    req.options = {};

    //Validation du paramètre d'URL unit
    if (req.query.unit) {
      const unit = req.query.unit;
      if (unit === 'c') {
        req.options.unit = unit;
      } else {
        throw HttpError.BadRequest(`Le paramètre unit doit avoir la valeur c, valeur entrée ${unit}`);
      }
    }
    next();

}