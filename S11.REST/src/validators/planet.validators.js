import expressValidator from 'express-validator';
const { body } = expressValidator;

class PlanetValidators {

    //https://github.com/validatorjs/validator.js#validators
    //https://express-validator.github.io/docs/index.html    
    complete() {
        return [
            ...this.partial(),
            body('name').exists().withMessage('name doit être présent').notEmpty().withMessage('name ne doit pas être vide'),
            body('position.x').exists().withMessage('position.x doit être présent'),
            body('position.y').exists().withMessage('position.y doit être présent'),
            body('position.z').exists().withMessage('position.z doit être présent'),
            body('discoveredBy').optional().isString().withMessage('discoveredBy doit être une chaîne'),
            body('discoveryDate').optional().isISO8601().withMessage('discoveryDate doit être une date valide'),
            body('satellites').optional().isArray().withMessage('satellites doit être un tableau')
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

    vibeValidator() {
        return [
            ...this.partial(),
            body('name').exists().withMessage('name doit être présent').notEmpty().withMessage('name ne doit pas être vide'),
            body('position.x').exists().withMessage('position.x doit être présent'),
            body('position.y').exists().withMessage('position.y doit être présent'),
            body('position.z').exists().withMessage('position.z doit être présent'),
            body('discoveredBy').optional().isString().withMessage('discoveredBy doit être une chaîne'),
            body('discoveryDate').optional().isISO8601().withMessage('discoveryDate doit être une date valide'),
            body('satellites').optional().isArray().withMessage('satellites doit être un tableau')
        ]
    }

}

export default new PlanetValidators();