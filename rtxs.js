var rtxData = document.getElementById("rtx-data");


for (var j = 0; j < 5; j++) {
  var rtxCol = document.createElement("tr");
  for (var i = 0; i < 5; i++) {
    var rtxCell = document.createElement("td");
    rtxCell.appendChild(document.createTextNode("a"));
    rtxCol.appendChild(rtxCell);
  }
  rtxData.appendChild(rtxCol);
}
