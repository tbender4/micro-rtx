//used for both managing and adding skus

function postAddSku() {
    
    let userSKU = document.getElementById("req-sku").value;
    console.log("Adding ", userSKU);
}

let todayDate = new Date(); //gets today's date
let todayDateFormatted = todayDate.toLocaleDateString();

let date_div = document.getElementById("current-date");
let date_text = document.createTextNode(todayDateFormatted);
date_div.appendChild(date_text);

//practicing addEventListner as alternative to onclick()
let btn = document.getElementById("search-sku");
btn.addEventListener("click", postAddSku);
