const express = require("express");
const path = require("path");
const pug = require("ejs");
const fs = require('fs');
const { json } = require("express");
const app = express();

//allows json parsing and setting the js/css folder
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.static(path.join(__dirname, "./client")));

app.set('view engine', 'ejs');

let products = {};


function decrease(key) {
  products[key].count = products[key].count - 1;
  //TODO: see if sync/async is a problem
  fs.writeFile('products.json', JSON.stringify(products), (err) => {
    if (err) {
      console.log('Failed to write to disk');
    }
    else {
    console.log('Wrote', key, 'to disk. Quantity is now', products[key].count);
    }
  });
}

let whitelistedProducts = {};
//send products json to ejs file
app.get("/", (req, res) => {
  let jsonData = fs.readFileSync('products.json');
  products = JSON.parse(jsonData);
  res.render("index", {
  products: products
  });
});

app.get("/listall", (req, res) => {
  let jsonData = fs.readFileSync('products.json');
  products = JSON.parse(jsonData);
  res.render("listall", {
  products: products
  });
});


let includedProducts = {};

app.get("/addskus", (req, res) => {
  let jsonData = fs.readFileSync('products.json');
  products = JSON.parse(jsonData);
  includedProducts = {'107870': products['107870']};
  console.log(includedProducts['107870']);

  res.render("addskus", {
    //product placeholder
    includedProducts: includedProducts
  });
});

//recieve request from client to decrease sku quantity
app.post('/decrease', function(req, res) {
  res.send(decrease(req.body.sku));
//  res.send('OK');
});

app.listen(3000, () => {
  console.log("it's live");
});
