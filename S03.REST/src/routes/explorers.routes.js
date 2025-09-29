import { Router } from 'express';
import HttpError from 'http-errors';

import planetsRepository from '../repositories/planets.repository.js';

const router = Router();

router.get('/:explorerName/planets', getExplorerPlanets);

async function getExplorerPlanets(req, res, next) {
    
    try {

        let planets = await planetsRepository.retrieveByExplorer(req.params.explorerName);
        
        planets = planets.map( p => {
            p = p.toObject();
            p = planetsRepository.transform(p);
            return p;
        });

        res.status(200).json(planets);

    } catch(err) {
        return next(err);
    }

}

export default router;
