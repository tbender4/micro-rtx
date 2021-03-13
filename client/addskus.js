//used for both managing and adding skus


function getSKUInfo() {
  //changes all TDs info
  
  let userSKU = document.getElementById("req-sku").value;
  let confirmSKUTr = document.getElementById("confirm-sku-tr");

  let skuTDs = confirmSKUTr.getElementsByTagName("td");
  console.log(skuTDs.length)
  console.log(skuTDs)
  skuTDs[0].innerHTML = "sku-here";
  skuTDs[1].innerHTML = "img-here";
  skuTDs[2].innerHTML = "name-here";
  skuTDs[3].innerHTML = "pricehere";
  skuTDs[4].innerHTML = "modelhere";

  let quantityDiv = document.getElementById("confirm-area")
  quantityDiv.hidden = false;
}

let todayDate = new Date(); //gets today's date
let todayDateFormatted = todayDate.toLocaleDateString();

let date_div = document.getElementById("current-date");
let date_text = document.createTextNode(todayDateFormatted);
date_div.appendChild(date_text);

//practicing addEventListner as alternative to onclick()
let btn = document.getElementById("search-sku");
btn.addEventListener("click", getSKUInfo);


