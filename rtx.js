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
  products[key].count = products[key].count - 1;
  //TODO: see if sync/async is a problem
  fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
    if (err) {
      console.log('Failed to write to disk');
    }
    else {
    console.log('Wrote', key, 'to disk. Quantity is now', products[key].count);
    }
  });
}

let whitelisted = {};
let products = {};
let test = { '700914': products['700914'] };

//send products json to ejs file
app.get("/", (req, res) => {
  let jsonData = fs.readFileSync('products.json');
  let whitelistedData = fs.readFileSync('whitelisted.json');
  products = JSON.parse(jsonData);

  
  res.render("index", {
  whitelisted: test,
  products: products
  });
});

app.get("/listall", (req, res) => {
  let whitelistedData = fs.readFileSync('whitelisted.json');
  let jsonData = fs.readFileSync('products.json');

  products = JSON.parse(jsonData);

  res.render("listall", {
  whitelisted: test,
  products: products
  });
});

app.get("/addskus", (req, res) => {
  let whitelistedData = fs.readFileSync('whitelisted.json');
  let jsonData = fs.readFileSync('products.json');

  products = JSON.parse(jsonData);
  test =  { '700914': products['700914'] };
  res.render("addskus", {
    products: products,
    whitelisted: test
  });
});

//recieve request from client to decrease sku quantity
app.post('/decrease', function(req, res) {
  res.send(decrease(req.body.sku));
//  res.send('OK');
});

//adds SKU receieved
app.post('/add', function(req, res) {
  console.log(req.body);
  //res.send('OK');
  res.end();  
});

app.listen(3000, () => {
  console.log("it's live");
});

//checks for SKU

app.get('/querysku/:sku', function (req, res) {
  let queriedSKU = req.params.sku;
  console.log(req.params);
  let returnSKUJSON = JSON.stringify(products[queriedSKU]);
  console.log(returnSKUJSON);
  res.json(returnSKUJSON);
  req.end();
});