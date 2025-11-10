import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {
    
    retrieveAll() {
        return Exploration.find();
    }

    retrieveByCriteria(filter, retrieveOptions) {

    }

    retrieveByUUID(explorationUUID, retrieveOptions) {

    }

    transform(exploration, retrieveOptions = {}, transformOptions = {}) {

        //TODO: À faire
        return exploration;
    }

}

export default new ExplorationsRepository();