import express from 'express';
import HttpError from 'http-errors';

import explorationsRepository from '../repositories/exploration.repository.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:uuidExploration', getOne);

async function getAll(req, res, next) {
    //TODO: Retrouver l'ensemble des explorations
}

async function getOne(req, res, next) {
    //TODO: Retrouver une exploration spécifique
}

export default router;
