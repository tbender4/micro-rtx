var date = Date.now();
let todayDateFormatted = date.getMonth();

let date_div = document.getElementById("current-date");
let date_text = document.createTextNode(todayDateFormatted);

date_div.appendChild(date_text);

