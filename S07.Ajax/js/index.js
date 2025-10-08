import { PLANETS_URL } from './constants.js';

$(document).ready(() => {
    retrievePlanets();
});

async function retrievePlanets() {
    try {
        //Requête GET à l'URL et attente de réponse
        const res = await axios.get(PLANETS_URL);
        //Vérifier le status
        if(res.status === 200) {
            //Récupérer le corps de la réponse
            const planets = res.data;
            planets.forEach(p => {
                $('#planets').append(displayPlanet(p));
            });
        }

    } catch(err) {
        console.log(err);
    }

}

function displayPlanet(planet) {
    let planetTag = `<a class="card col-2 mx-2 my-2" href="./details.html?planet=${planet.href}">`;
    planetTag += `<div>`;
    planetTag += `<img src="${planet.icon}" class="card-img-top" alt="L'image de la planète ${planet.name}" />`;
    planetTag += `<h5 class="card-title">${planet.name}</h5>`;
    planetTag += `</div>`;
    planetTag += `</a>`;

    return planetTag;
}