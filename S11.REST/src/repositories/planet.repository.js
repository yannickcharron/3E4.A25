import dayjs from 'dayjs';
import Planet from '../models/planet.model.js';

const ZERO_KELVIN = -273.15;

class PlanetRepository {

    retrieveAll() {
        return Planet.find();
    }

    retrieveByCriteria(criteria) {
        return Planet.find(criteria);
    }

    retrieveByUUID(planetUUID, retrieveOptions) {
        const retrieveQuery = Planet.findOne({uuid: planetUUID});
        return retrieveQuery;
    }

    create(planet) {
        return Planet.create(planet);
    }

    update(planetUUID, planet) {
        //TODO: Permettre la mise à jour
    }

    transform(planet, transformOptions = {}) {
        if(transformOptions) {
            if(transformOptions.unit === 'c') {
                planet.temperature += ZERO_KELVIN;
                planet.temperature = parseFloat(planet.temperature.toFixed(2));
            }
        }

        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');

        planet.lightspeed = 
            `${planet.position.x.toString(16)}@${planet.position.y.toString(16)}#${planet.position.z.toString(16)}`;

        //TODO: Ajouter de nouvelles transformations

        delete planet._id;
        delete planet.__v;
    
        return planet;
    }

}

export default new PlanetRepository();