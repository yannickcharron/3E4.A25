import express from 'express';
import HttpError from 'http-errors';

import planetRepository from '../repositories/planet.repository.js';

import { handleUnitParam } from '../middlewares/temperature.unit.middleware.js';

const router = express.Router();

router.post('/', post);
router.get('/', handleUnitParam, getAll);
router.get('/:uuidPlanet', handleUnitParam, getOne);
router.delete('/:uuidPlanet', deleteOne);

async function getAll(req, res, next) {

  const transformOptions = req.options;

  try {
    let planets = await planetRepository.retrieveAll();

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

async function getOne(req, res, next) {
  try {
    
    const transformOptions = req.options;

    const retrieveOptions = {};
    const uuidPlanet = req.params.uuidPlanet;

    let planet = await planetRepository.retrieveByUUID(uuidPlanet, retrieveOptions);

    if (!planet) {
      return next(HttpError.NotFound(`La planète avec l'identifiant ${uuidPlanet} n'existe pas`));
    }

    planet = planet.toObject({ getters: false, virtuals: true });
    planet = planetRepository.transform(planet, transformOptions);

    res.status(200).json(planet);
  } catch (err) {
    return next(err);
  }
}

function deleteOne(req, res, next) {
  return next(HttpError.MethodNotAllowed());
}

async function post(req, res, next) {
  try {

    //TODO: Ajouter une validation adéquate

    if (Object.keys(req.body).length === 0) {
      return next(HttpError.BadRequest('Impossible de créer une planète sans propriété'));
    }

    //TODO: Limiter la bande passante utilisée pour la réponse

    let newPlanet = await planetRepository.create(req.body);
    
    newPlanet = newPlanet.toObject({ getters: false, virtuals: false });
    newPlanet = planetRepository.transform(newPlanet);

    res.status(201).json(newPlanet);
  } catch (err) {
    return next(err);
  }
}

//TODO: Mise à jour partielle

//TODO: Mise à jour complète

export default router;
