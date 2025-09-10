import { Router } from 'express';
import HttpError from 'http-errors';

import planetsData from '../data/planets.js';

const router = Router();

router.get('/', getAll); //Retrouver toutes les planètes
router.get('/:idPlanet', getOne); //Retrouver une planète
router.post('/', post); //Créer une planète
router.delete('/:idPlanet', deleteOne); //Supprimer une planète
router.put('/:idPlanet', put); //Mettre à jour une planète
router.patch('/:idPlanet', patch); //Mettre à jour une planète

function getAll(req, res, next) {
  //Étape 1: Status
  res.status(200);
  //Étape 3: Traitement

  //Étape 2: Content-Type
  //Étape 4: Envoi réponse
  //.json => 'Content-Type', 'application/json' et send()
  res.json(planetsData);
}

function getOne(req, res, next) {
  const idPlanet = parseInt(req.params.idPlanet, 10);
  const planet = planetsData.find((p) => p.id === idPlanet);

  if (planet) {
    res.status(200);
    res.json(planet);
  } else {
    return next(HttpError.NotFound(`Planet with id ${idPlanet} not found`));
  }
}

function post(req, res, next) {

}

function deleteOne(req, res, next) {

}

function put(req, res, next) {
    return next(HttpError.NotImplemented());
}

function patch(req, res, next) {
    return next(HttpError.MethodNotAllowed());
}

export default router;
