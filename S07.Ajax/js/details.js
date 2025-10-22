import { extractUrlParams } from './extractParams.js';

const urlParams = extractUrlParams();

$(document).ready(async () => {
  //Récupérer les données de la planète
  const planet = await retrievePlanet(urlParams.planet);
  displayDetailsPlanet(planet);
  displaySatellites(planet.satellites);
  displayPortals(planet.portals);

  $('#btnAddPortal').click(() => {
    addPortal();
  });
});

async function retrievePlanet(href) {
  try {
    const res = await axios.get(href);
    if (res.status === 200) {
      const planet = res.data;
      return planet;
    } else if (res.status === 404) {
      console.log('Planet not found');
    }
  } catch (err) {
    console.log(err);
  }
}

function displayDetailsPlanet(planet) {
  console.log(planet);
  $('#lblName').html(planet.name);
  $('#imgPlanet').attr('src', planet.icon);

  $('#lblDiscoveredBy').html(planet.discoveredBy);
  $('#lblDiscoveryDate').html(planet.discoveryDate);
  $('#lblTemperature').html(planet.temperature);

  const position = planet.position;
  $('#lblPosition').html(`(${position.x.toFixed(3)}; ${position.y.toFixed(3)}; ${position.z.toFixed(3)})`);
}

function displaySatellites(satellites) {
  if (satellites.length === 0) {
    $('#satellites').append(`<p>Aucun satellite</p>`);
  } else {
    satellites.forEach((s) => {
      $('#satellites').append(`<li>${s}</li>`);
    });
  }
}

function displayPortals(portals, isAppend = true) {
  portals.forEach((p) => {
    let portalHtml = '<tr>';
    portalHtml += `<td>${p.position}</td>`;
    portalHtml += `<td><img src="./img/${p.affinity}.png" /></td>`;
    portalHtml += '</tr>';

    if (isAppend) {
      $('#portals').append(portalHtml);
    } else {
      $('#portals').prepend(portalHtml);
    }
  });
}

async function addPortal() {
  try {
    const URL = `${urlParams.planet}/portals`;
    const body = {
      position: $('#txtPortalPosition').val(),
      affinity: $('#cboAffinity').val(),
    };

    const res = await axios.post(URL, body);
    if (res.status === 201) {
      const portals = [res.data];
      displayPortals(portals, false);
    } else {
      //Tout status différents de 201, mais pas dans les 500
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
}

function extractElements() {
    
}