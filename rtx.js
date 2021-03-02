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
<<<<<<< HEAD
  //TODO: make this async
  
  fs.writeFile('products.json', products, (err) => {
    if (err) return 'OK';
    console.log('Wrote', key, 'to disk.');
    returnkk;
=======
  //TODO: see if sync/async is a problem
  fs.writeFile('products.json', JSON.stringify(products), (err) => {
    if (err) {
      console.log('Failed to write to disk');
    }
    else {
    console.log('Wrote', key, 'to disk. Quantity is now', products[key].count);
    }
>>>>>>> 453117849f9399a3fe5a56d4ba6784420b20c20b
  });
}


//send products json to ejs file
app.get("/", (req, res) => {
  let jsonData = fs.readFileSync('products.json');
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
