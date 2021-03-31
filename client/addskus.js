//used for both managing and adding skus

//passed in: whitelisted = {}
//           products    = {}
//           
let confirmSKUTr = document.getElementById("confirm-sku-tr");
let skuTDs = confirmSKUTr.getElementsByTagName("td");
let searchBtn = document.getElementById('search-sku');
let userSKUTextbox = document.getElementById("req-sku");

function getSKUInfo() {
  //changes all TDs
  clearAddingSku();
  
  let userSKU = userSKUTextbox.value;
  

  fetch('/querysku/' + userSKU )
  .then ( response => {
    console.log(response);
    if (response.ok) {

      console.log('response ok. Check below if the SKU came out')
      return response.json()
    }
    else {
      alert('sku query failed');
      return;
    }
  })
  .then(data => {
        let sku_data = JSON.parse(data);
        console.log(sku_data)

        skuTDs[0].innerHTML = sku_data['sku'];
        sku_img = document.createElement('img')
        sku_img.src = sku_data['image'];
        skuTDs[1].appendChild(sku_img);
        skuTDs[2].innerHTML = sku_data["name"];
        skuTDs[3].innerHTML = sku_data["price"];
        skuTDs[4].innerHTML = sku_data["modelnum"];
      
        addSKUTable.hidden = false;
        quantityDiv.hidden = false;
        disableAddingSkuField();
        
        return;
    });
}


function clearAddingSku() {
  for (i = 0; i < 5; i++)
    skuTDs[i].innerHTML = '';
  quantityDiv.hidden = true;
  addSKUTable.hidden = true;
}

function disableAddingSkuField() {
  searchBtn.disabled = true;
  userSKUTextbox.disabled = true;
}
function enableAddingSkuField() {
  searchBtn.disabled = false;
  userSKUTextbox.disabled = false;
}

function cancelAddingSku() {
  clearAddingSku();
  enableAddingSkuField();

}

function confirmAddingSku() {
  //TODO: Implement SKU being added
  console.log("Implement SKU Added");
  clearAddingSku();
  enableAddingSkuField();
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