import { Router } from 'express';
import HttpError from 'http-errors';

import planetsData from '../data/planets.js';

import method from '../middlewares/method.js';

import planetsRepository from '../repositories/planets.repository.js';

const router = Router();

router.get('/', getAll); //Retrouver toutes les planètes
router.get('/:uuidPlanet', getOne); //Retrouver une planète
router.post('/', post); //Créer une planète
router.delete('/:uuidPlanet', method, deleteOne); //Supprimer une planète
router.put('/:uuidPlanet', method, put); //Mettre à jour une planète
router.patch('/:uuidPlanet', method, patch); //Mettre à jour une planète

async function getAll(req, res, next) {
  try {
    const transformsOptions = {};

    if (req.query.unit) {
      if (req.query.unit !== 'c') {
        return next(HttpError.BadRequest(`Param unit needs to be c`));
      }
      transformsOptions.unit = req.query.unit;
    }

    let planets = await planetsRepository.retrieveAll();

    planets = planets.map((p) => {
      p = p.toObject();
      p = planetsRepository.transform(p, transformsOptions);
      return p;
    });

    res.status(200).json(planets);
  } catch (err) {
    return next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const transformsOptions = {};

    if (req.query.unit) {
      if (req.query.unit !== 'c') {
        return next(HttpError.BadRequest(`Param unit needs to be c`));
      }
      transformsOptions.unit = req.query.unit;
    }

    let planet = await planetsRepository.retrieveByUUID(req.params.uuidPlanet);

    if (!planet) {
      return next(HttpError.NotFound(`Planet with ${req.params.uuidPlanet} doesn't exist.`));
    }

    planet = planet.toObject();
    planet = planetsRepository.transform(planet, transformsOptions);

    res.status(200).json(planet);
  } catch (err) {
    return next(err);
  }
}

async function post(req, res, next) {
  const newPlanet = req.body;

  if(Object.keys(newPlanet).length === 0) {
    return next(HttpError.BadRequest('Body cannot be empty'));
  }

  if(newPlanet.uuid) {
    return next(HttpError.BadRequest('uuid cannot be in body'));
  }

  try {
    let planet = await planetsRepository.create(newPlanet);

    planet = planet.toObject();
    planet = planetsRepository.transform(planet);

    res.status(201).json(planet);

  } catch(err) {
    return next(err);
  }
  
}

async function deleteOne(req, res, next) {

  try {
    const planetDeleted = await planetsRepository.delete(req.params.uuidPlanet);
    if(!planetDeleted) {
      return next(HttpError.NotFound('planet not found'));
    }
    
    res.status(204).end();

  } catch(err) {
    return next(err);
  }

}

function put(req, res, next) {
  return next(HttpError.NotImplemented());
}

function patch(req, res, next) {
  return next(HttpError.MethodNotAllowed());
}

export default router;
