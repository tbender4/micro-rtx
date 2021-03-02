//const { response } = require("express");

console.log('client js loaded');

function decreaseSKU(target_sku) {
  console.log('decreasing', target_sku, 'by one');

  //calling /decrease which exists server side
  fetch('/decrease', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sku: target_sku })
  })
  .then ( response => {
    console.log(response);
    if(response.ok) {
      //TODO: Change this to pull latest change instead of the decrement by one
      
      let td_quantity = document.getElementById(target_sku).children[1];
      td_quantity.innerHTML =parseInt(td_quantity.textContent)-1;
      console.log('successfully decreased', target_sku);
    }
    else {
      alert('Request failed.');
    }
  }
  );
};
