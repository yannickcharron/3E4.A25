import { Router } from 'express';
import HttpError from 'http-errors';

import planetsRepository from '../repositories/planets.repository.js';

const router = Router();

router.get('/:explorerName/planets', getExplorerPlanets);

function getExplorerPlanets(req, res, next) {

    try {

    } catch(err) {
        return next(err);
    }


}

export default router;
