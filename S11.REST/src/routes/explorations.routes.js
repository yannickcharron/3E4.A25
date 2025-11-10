import express from 'express';
import HttpError from 'http-errors';

import explorationsRepository from '../repositories/exploration.repository.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:uuidExploration', getOne);

async function getAll(req, res, next) {
    try {

        let explorations = await explorationsRepository.retrieveAll();

        explorations = explorations.map(e => {
            e = e.toObject();
            e = explorationsRepository.transform(e);
            return e;
        });

        res.status(200).json(explorations);

    } catch(err) {
        return next(err);
    }
}

async function getOne(req, res, next) {
    //TODO: Retrouver une exploration spécifique
}

export default router;
