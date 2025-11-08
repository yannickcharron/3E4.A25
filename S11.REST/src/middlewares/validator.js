import HttpErrors from 'http-errors';
import expressValidator from 'express-validator';
const { validationResult } = expressValidator;

export default (req, res, next) => {

    //https://medium.com/@k3nn7/structuring-validation-errors-in-rest-apis-40c15fbb7bc3
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ error: err.msg, path: err.path, value: err.value  }));

    throw HttpErrors.UnprocessableEntity(extractedErrors);
}