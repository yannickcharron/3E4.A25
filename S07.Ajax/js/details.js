import { extractUrlParams } from './extractParams.js';

const urlParams = extractUrlParams();

$(document).ready(async () => {
    //TODO: Récupérer les données de la planète
    const planet = await retrievePlanet(urlParams.planet);
    displayDetailsPlanet(planet);
});

async function retrievePlanet(href) {
    try {
        const res = await axios.get(href);
        if(res.status === 200) {
            const planet = res.data;
            console.log(planet);
            return planet;
        }
    } catch(err) {
        console.log(err);
    }
}

function displayDetailsPlanet(planet) {
    console.log(planet);
    $("#planet").append(planet.name);
}