import dayjs from 'dayjs';
import Planet from '../models/planet.model.js';
import explorationRepository from './exploration.repository.js';

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

        if(retrieveOptions.explorations) {
            retrieveQuery.populate('explorations');
        }

        return retrieveQuery;
    }

    create(planet) {
        return Planet.create(planet);
    }

    update(planetUUID, planet) {
        const filter = { uuid: planetUUID};
        return Planet.findOneAndUpdate(filter, {$set: Object.assign(planet)}, { new:true, runValidators: true })
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

        planet.href = `${process.env.BASE_URL}:${process.env.PORT}/planets/${planet.uuid}`;
        //TODO: Ajouter de nouvelles transformations

        if(planet.explorations) {
            planet.explorations = planet.explorations.map(e => {
                e = explorationRepository.transform(e);
                e.planet.href = planet.href;
                //delete e.planet;
                return e;
            });
        }

        delete planet.uuid;
        delete planet._id;
        delete planet.__v;
    
        return planet;
    }

}

export default new PlanetRepository();