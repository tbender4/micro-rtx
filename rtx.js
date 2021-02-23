const express = require("express");
const path = require("path");
const pug = require("ejs");
const fs = require('fs');
const app = express();

//allows json parsing and setting the js/css folder
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.static(path.join(__dirname, "./client")));

app.set('view engine', 'ejs');

function decrease(key) {
  console.log("decreased by 1 for " + key);
}

let jsonData = fs.readFileSync('products.json');

//send products json to ejs file
app.get("/", (req, res) => {
  let products = JSON.parse(jsonData);
  res.render("index", {
  products: products,
  });
});

//recieve request from client to decrease sku quantity
app.post('/decrease', function(req, res) {
  decrease(req.body.sku);
});

app.listen(3000, () => {
  console.log("it's live");
});
