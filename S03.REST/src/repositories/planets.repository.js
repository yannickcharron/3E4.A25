import Planet from '../models/planet.model.js';

import { ZERO_KELVIN } from '../core/constants.js';

class PlanetsRepository {
  retrieveAll() {
    //SELECT * FROM planets WHERE discoveredBy = "Skadex" AND temperature > 240 AND position.y < 500
    const criteriaOne = {
      discoveredBy: 'Skadex',
      temperature: { $gt: 240 },
      'position.y': { $lt: 500 },
    };

    const criteriaOr = {
      $or: [{ discoveredBy: 'Skadex'}, { temperature: { $gt: 240 } }],
    };

    //équivalent: SELECT * FROM planets
    return Planet.find();
  }

  retrieveByExplorer(explorerName) {
    const criteria = {
      discoveredBy: explorerName,
    }

    return Planet.find(criteria);
  }

  retrieveByUUID(uuid) {
    //SELECT * FROM planets WHERE uuid = ?
    return Planet.findOne({ uuid: uuid });
  }

  create(newPlanet) {
    return Planet.create(newPlanet);
  }

  delete(uuidPlanet) {
    return Planet.findOneAndDelete({uuid: uuidPlanet});
  }

  transform(planet, options = {}) {
    if (options.unit === 'c') {
      planet.temperature += ZERO_KELVIN;
      //planet.temperature = parseFloat((planet.temperature + ZERO_KELVIN).toFixed(2));
    }

    planet.lightspeed = `${planet.position.x.toString(16)};${planet.position.y.toString(16)};${planet.position.z.toString(16)}`;
    planet.wind = this.transformWindDirection(56);

    const valeurBase10 = parseInt('0x8676', 16);

    delete planet._id;
    delete planet.__v;

    return planet;
  }

  transformWindDirection(degree) {
    const wind = {
      degree: degree,
      direction: '',
      speed: 67,
    };

    //Code pour transformer le degrée et point cardinal

    wind.direction = 'NW';

    return wind;
  }
}

export default new PlanetsRepository();
