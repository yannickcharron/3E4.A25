import HttpErrors from 'http-errors';

export default function paginateMiddleware(options = {}) {
    const defaultPage = options.defaultPage ?? 1;
    const defaultLimit = options.defaultLimit ?? 20;
    const defaultMaxLimit = options.defaultMaxLimit ?? 100;

    return function(req, res, next) {

        //Validation des paramètres (page et limit)
        let page = parseInt(req.query.page, 10);
        let limit = parseInt(req.query.limit, 10);

        //Gestion des paramètres invalides
        if(isNaN(page)) {
            page = defaultPage;
            //throw HttpErrors.BadRequest('La page doit être un nombre');
        }

        if(page < 1) {
            throw HttpErrors.BadRequest('Le page demandée doit être supérieur à 0');
        }

        if(isNaN(limit)) {
            limit = defaultLimit;
            //throw HttpErrors.BadRequest('La limit doit être un nombre');
        }

        if(limit < 1) {
            throw HttpErrors.BadRequest('Le limite demandée doit être supérieur à 0');
        }

        if(limit > defaultMaxLimit) { 
            limit = defaultMaxLimit; 
        }
        
        const skip = (page - 1) * limit;
        const createUrl = (p) => `${req.protocol}://${req.host}${req.baseUrl}?page=${p}&limit=${limit}`;

        req.pagination = {
            page: page,
            limit: limit,
            skip: skip,
            links: (totalPages) => {
                const links = {};
                
                if(page > 1) {
                    links.prev = createUrl(page - 1);
                }
                links.self = createUrl(page);
                if(page < totalPages) {
                    links.next = createUrl(page + 1);
                }

                return links;

            }
        }

        next();
    }

}

