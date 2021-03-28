//used for both managing and adding skus

//passed in: whitelisted = {}
//           products    = {}
//           
 
function getSKUInfo() {
  //changes all TDs
  
  let userSKU = document.getElementById("req-sku").value;
  let confirmSKUTr = document.getElementById("confirm-sku-tr");

  fetch('/querysku', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( {sku: userSKU } )
  })
  .then ( response => {
    console.log(response);
    if (response.ok) {
      console.log(response.body);
      console.log('did it work?')
    }
    else {
      alert('sku query failed');
    }
  })
  console.log(userSKU);
 

  let skuTDs = confirmSKUTr.getElementsByTagName("td");
  console.log(skuTDs.length)
  console.log(skuTDs)
  skuTDs[0].innerHTML = 'sku here';
  skuTDs[1].innerHTML = "img-here";
  skuTDs[2].innerHTML = "name-here";
  skuTDs[3].innerHTML = "pricehere";
  skuTDs[4].innerHTML = "modelhere";

  addSKUTable.hidden = false;
  quantityDiv.hidden = false;


}

function cancelAddingSku() {
  quantityDiv.hidden = true;
  addSKUTable.hidden = true;
}

function confirmAddingSku() {
  //TODO: Implement SKU being added
  console.log("SKU Added");
  quantityDiv.hidden = true;
  addSKUTable.hidden = true;
}

let todayDate = new Date(); //gets today's date
let todayDateFormatted = todayDate.toLocaleDateString();

let date_div = document.getElementById("current-date");
let date_text = document.createTextNode(todayDateFormatted);
date_div.appendChild(date_text);

//practicing addEventListner as alternative to onclick()
let btn = document.getElementById("search-sku");
btn.addEventListener("click", getSKUInfo);

let addSKUTable =  document.getElementById("whitelist-products");
let quantityDiv = document.getElementById("confirm-area");
let confirmBtn = document.getElementById("confirm-add");
let cancelBtn = document.getElementById("cancel-add");
cancelBtn.addEventListener("click", cancelAddingSku);
confirmBtn.addEventListener("click", confirmAddingSku);