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

let products = {};

function decrease(key) {
  products[key].count = products[key].count - 1;
  //TODO: make this async
  
  fs.writeFile('products.json', products, (err) => {
    if (err) return 'OK';
    console.log('Wrote', key, 'to disk.');
    returnkk;
  });
}

let jsonData = fs.readFileSync('products.json');

//send products json to ejs file
app.get("/", (req, res) => {
  products = JSON.parse(jsonData);
  res.render("index", {
  products: products,
  });
});

app.get("/addskus", (req, res) => {
  products = JSON.parse(jsonData);
  res.render("addskus", {
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
