const express = require("express");
const path = require("path");
//const pug = require("pug");
const fs = require('fs');
const app = express();

//app.set('view engine', 'pug');

let jsonData = fs.readFileSync('products.json');
let products = JSON.parse(jsonData);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
//  res.render("index", {
//  name: "thomas",
//  products: products
//  });
});

app.listen(3000, () => {
  console.log("it's live");
});
