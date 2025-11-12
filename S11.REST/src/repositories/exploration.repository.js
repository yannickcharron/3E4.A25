import Exploration from '../models/exploration.model.js';
import planetRepository from './planet.repository.js';

class ExplorationsRepository {
  retrieveAll() {
    return Exploration.find();
  }

  retrieveWithOptions(options) {
    console.log(options);
    const retrieveQuery = Exploration.find()
      .limit(options.limit)
      .skip(options.page * options.limit)
      .sort({ explorationDate: 1 })
      .populate('planet', 'uuid');

    if (options.planet) {
      retrieveQuery.populate('planet');
    }

    return retrieveQuery;
  }

  retrieveByCriteria(filter, retrieveOptions) {}

  retrieveByUUID(explorationUUID, retrieveOptions) {}

  transform(exploration, retrieveOptions = {}, transformOptions = {}) {
    
    if (retrieveOptions.planet) {
      exploration.planet = planetRepository.transform(exploration.planet);
    } else {
      exploration.planet = {
        href: `${process.env.BASE_URL}:${process.env.PORT}/planets/${exploration.planet.uuid}`,
      };
    }

    exploration.href = `${process.env.BASE_URL}:${process.env.PORT}/explorations/${exploration.uuid}`;

    delete exploration.uuid;
    delete exploration._id;
    delete exploration.__v;

    return exploration;
  }
}

export default new ExplorationsRepository();
