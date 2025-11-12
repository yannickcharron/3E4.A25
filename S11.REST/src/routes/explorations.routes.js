import express from 'express';
import HttpError from 'http-errors';
import paginate from 'express-paginate';

import explorationsRepository from '../repositories/exploration.repository.js';

const router = express.Router();

router.get('/', paginate.middleware(20, 50), getAll);
router.get('/:uuidExploration', getOne);

async function getAll(req, res, next) {

    console.log(req.skip);

    try {

        const options = {
            limit: parseInt(req.query.limit, 10),
            page: parseInt(req.query.page, 10)
        }

        if(req.query.embed && req.query.embed === 'planet') {
            options.planet = true;
        }

        let explorations = await explorationsRepository.retrieveWithOptions(options);

        explorations = explorations.map(e => {
            e = e.toObject();
            e = explorationsRepository.transform(e, options);
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
