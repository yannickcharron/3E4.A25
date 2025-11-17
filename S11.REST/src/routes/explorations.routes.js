import express from 'express';
import paginateMiddleware from '../middlewares/paginate.js';
import HttpErrors from 'http-errors';

import explorationsRepository from '../repositories/exploration.repository.js';

const router = express.Router();

router.get('/', paginateMiddleware({ defaultLimit:25, defaultMaxLimit: 50 }) , getAll);
router.get('/:uuidExploration', getOne);

async function getAll(req, res, next) {

    try {

        const options = {
            skip: req.pagination.skip,
            limit: req.pagination.limit
        }

        if(req.query.embed && req.query.embed === 'planet') {
            options.planet = true;
        }

        let [ explorations, totalDocuments ] = await explorationsRepository.retrieveWithOptions(options);

        explorations = explorations.map(e => {
            e = e.toObject();
            e = explorationsRepository.transform(e, options);
            return e;
        });

        const totalPages = Math.ceil(totalDocuments / req.pagination.limit);

        if(req.pagination.page > totalPages) {
            throw HttpErrors.BadRequest(`La page demandée doit être inférieure à ${totalPages}`);
        }

        const responseBody = {
            _metadata: {
                page: req.pagination.page,
                limit: req.pagination.limit,
                skip: req.pagination.skip,
                hasNextPage: req.pagination.page < totalPages,
                totalPages: totalPages,
                totalDocuments: totalDocuments
            },
            _links: req.pagination.links(totalPages),
            data: explorations
        }

        res.status(200).json(responseBody);

    } catch(err) {
        return next(err);
    }
}

async function getOne(req, res, next) {
    //TODO: Retrouver une exploration spécifique
}

export default router;
