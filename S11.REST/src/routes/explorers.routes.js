import express from 'express';

import planetRepository from '../repositories/planet.repository.js';
import { handleUnitParam } from '../middlewares/temperature.unit.middleware.js';

const router = express.Router();

router.get('/:explorerName', handleUnitParam, getPlanetsDiscoveredBy);

async function getPlanetsDiscoveredBy(req, res, next) {

  //TODO: Permettre l'utilisation du paramètre unit dans l'URL
  const transformOptions = req.options;

  try {
    const criteria = { discoveredBy: req.params.explorerName };
    let planets = await planetRepository.retrieveByCriteria(criteria);

    planets = planets.map((p) => {
      p = p.toObject({ getters: false, virtuals: false });
      p = planetRepository.transform(p, transformOptions);
      return p;
    });

    res.status(200).json(planets);
  } catch (err) {
    return next(err);
  }
}

export default router;
