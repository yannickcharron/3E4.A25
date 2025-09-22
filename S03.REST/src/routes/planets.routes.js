import { Router } from 'express';
import HttpError from 'http-errors';

import planetsData from '../data/planets.js';

import method from '../middlewares/method.js';

import planetsRepository from '../repositories/planets.repository.js';

const router = Router();

router.get('/', getAll); //Retrouver toutes les planètes
router.get('/:uuidPlanet', getOne); //Retrouver une planète
router.post('/', post); //Créer une planète
router.delete('/:idPlanet', method, deleteOne); //Supprimer une planète
router.put('/:idPlanet', method, put); //Mettre à jour une planète
router.patch('/:idPlanet', method, patch); //Mettre à jour une planète

async function getAll(req, res, next) {
  try {
    const planets = await planetsRepository.retrieveAll();
    res.status(200).json(planets);
  } catch (err) {
    return next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const transformsOptions = {};

    if(req.query.unit) {
      if(req.query.unit !== 'c') {
        return next(HttpError.BadRequest(`Param unit needs to be c`));
      }
      transformsOptions.unit = req.query.unit;
    }

    let planet = await planetsRepository.retrieveByUUID(req.params.uuidPlanet);

    if(!planet) {
      return next(HttpError.NotFound(`Planet with ${req.params.uuidPlanet} doesn't exist.`));
    }

    planet = planet.toObject();
    planet = planetsRepository.transform(planet, transformsOptions);

    res.status(200).json(planet);

  } catch (err) {
    return next(err);
  }

}

function post(req, res, next) {
  const newPlanet = req.body;

  if (!newPlanet) {
    return next(HttpError.BadRequest('Planet cannot be empty.'));
  }
  //findIndex peut être remplacé par find
  const indexPlanet = planetsData.findIndex((p) => p.id === newPlanet.id);
  if (indexPlanet !== -1) {
    return next(HttpError.Conflict(`Planet with id ${newPlanet.id} already exists`));
  }

  planetsData.push(newPlanet);
  res.status(201).json(newPlanet);
}

function deleteOne(req, res, next) {
  const idPlanet = parseInt(req.params.idPlanet, 10);
  const indexPlanet = planetsData.findIndex((p) => p.id === idPlanet);
  console.log(req.yannick);

  if (indexPlanet === -1) {
    return next(HttpError.NotFound(`Planet with id ${idPlanet} not found`));
  }
  planetsData.splice(indexPlanet, 1);

  res.status(204).end();
}

function put(req, res, next) {
  return next(HttpError.NotImplemented());
}

function patch(req, res, next) {
  return next(HttpError.MethodNotAllowed());
}

export default router;
