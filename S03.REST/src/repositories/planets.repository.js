import Planet from '../models/planet.model.js';

import { ZERO_KELVIN } from '../core/constants.js';

class PlanetsRepository {
  retrieveAll() {
    //équivalent: SELECT * FROM planets
    return Planet.find();
  }

  retrieveByUUID(uuid) {
    //SELECT * FROM planets WHERE uuid = ?
    return Planet.findOne({ uuid: uuid });
  }

  transform(planet, options) {

    if(options.unit === 'c') {
        planet.temperature += ZERO_KELVIN;
        //planet.temperature = parseFloat((planet.temperature + ZERO_KELVIN).toFixed(2));
    }

    delete planet._id;

    return planet;
  }
}

export default new PlanetsRepository();
