import { ELEMENT_IMG_URL } from './constants.js';

$(document).ready(() => {
  const inventory = JSON.parse(localStorage.getItem('inventory'));
  const name = localStorage.getItem('name');
  const color = localStorage.getItem('color');

  $('#txtName').val(name);
  $('#clpColor').val(color);

  if (inventory) {
    inventory.forEach((e) => {
      const tag = displayElement(e);
      $('#inventory').append(tag);
    });
  }
  
  $('.element-quantity').css('color', color);

  $('#txtName').keyup((e) => {
    localStorage.setItem('name', $('#txtName').val());
  });

  $('#clpColor').on('change', (e) => {
    const color = $('#clpColor').val();
    localStorage.setItem('color', color);
    $('.element-quantity').css('color', color);
  });
});

function displayElement(e) {
  let elementTag = '<div class="col-2 mx-2 my-2">';
  elementTag += '<div class="card">';
  elementTag += '<div class="card-header">';
  elementTag += `<h4>${e.element}</h4>`;
  elementTag += '</div>';
  elementTag += '<div class="card-body">';
  elementTag += `<img class="imgElement" src="${ELEMENT_IMG_URL}/${e.element}.png" class="element">`;
  elementTag += `<p class="element-quantity">${e.quantity}</p>`;
  elementTag += '</div>';
  elementTag += '</div>';
  elementTag += '</div>';

  return elementTag;
}
