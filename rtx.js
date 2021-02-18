const express = require("express");
const path = require("path");
//const pug = require("pug");
const pug = require("ejs");
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, "")));
app.set('view engine', 'ejs');

let jsonData = fs.readFileSync('products.json');

app.get("/", (req, res) => {
  let products = JSON.parse(jsonData);
  res.render("index", {
  products: products
  });
});

app.listen(3000, () => {
  console.log("it's live");

});
