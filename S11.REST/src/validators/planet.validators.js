import expressValidator from 'express-validator';
const { body } = expressValidator;

class PlanetValidators {

    //https://github.com/validatorjs/validator.js#validators
    //https://express-validator.github.io/docs/index.html    
    complete() {
        return [
            , ...this.partial()
        ]

    }

    partial() {
        return [
            body('uuid').not().exists().withMessage('uuid ne doit pas être présent'),
            body('position.x').optional().isFloat({min: -1000, max: 1000}).withMessage('x doit être compris entre -1000 et 1000'),
            body('position.y').optional().isFloat({min: -1000, max: 1000}).withMessage('y doit être compris entre -1000 et 1000'),
            body('position.z').optional().isFloat({min: -1000, max: 1000}).withMessage('z doit être compris entre -1000 et 1000'),
            body('temperature').optional().isNumeric().withMessage('doit être numérique')

        ]
    }

}

export default new PlanetValidators();