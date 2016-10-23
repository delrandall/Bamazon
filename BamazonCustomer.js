/*
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
})
*/
/*
// Dependencies
// =============================================================
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')


// Sets up the Express App
// =============================================================
var app = express()
var PORT = process.env.PORT || 3000


// Sets up the Express app to handle data parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
*/

// Data
// ===========================================================
//(ItemID, ProductName, DepartmentName, Price, StockQuantity)

var tables = [{
    ItemID: '01',
    ProductName: 'Clarity Defender® PLUS Automotive Windshield Treatment',
    DepartmentName: 'Auto',
    Price: '1999',
    StockQuantity: '10'
},  {
    ItemID: '02',
    ProductName: 'Miller Beer in plastic bottles with clay nanoparticles',
    DepartmentName: 'Grocery',
    Price: '999',
    StockQuantity: '40'
}, {
    ItemID: '03',
    ProductName: 'Body Armor with Fabric Coating"',
    DepartmentName: 'Armor',
    Price: '50000',
    StockQuantity: '5'
}, {
    ItemID: '04',
    ProductName: 'lithium iron phosphate battery',
    DepartmentName: 'Home Tools',
    Price: '7664',
    StockQuantity: '10'
}, {
    ItemID: '05',
    ProductName: 'Verigene system with DNA-coated gold nanoparticles',
    DepartmentName: 'Pharmacy',
    Price: '99999',
    StockQuantity: '2'
}, {
    ItemID: '06',
    ProductName: 'Palm-Tree Wax',
    DepartmentName: 'Auto',
    Price: '1999',
    StockQuantity: '20'
}, {
    ItemID: '07',
    ProductName: 'Nanosolar Panel Set (400 Watt Off Grid)',
    DepartmentName: 'Home',
    Price: '143572',
    StockQuantity: '8'
}, {
    ItemID: '08',
    ProductName: 'Pregnancy Test with Gold Nanoparticles',
    DepartmentName: 'Pharmacy',
    Price: '1298',
    StockQuantity: '30'
},  {
    ItemID: '10',
    ProductName: 'Nosebleed Bandage with Aluminosilicate Nanoparticles (1 large)',
    DepartmentName: 'Pharmacy',
    Price: '2400',
    StockQuantity: '10'
},

/*
(1,"Clarity Defender® PLUS Automotive Windshield Treatment", "Auto", 1999, 10),
(2, "Miller Beer in plastic bottles with clay nanoparticles", "Grocery", 999, 40),
(3, "Body Armor with Fabric Coating",   "Armor",    500,    5),
(4, "lithium iron phosphate battery",   "Home Tools",   7664,   10),
(5, "Verigene system with DNA-coated gold nanoparticles",   "Pharmacy", 99999,  2),
(6, "Palm-Tree Wax",    "Auto", 1999,   20),
(7, "Nanosolar Panel Set (400 Watt Off Grid)",  "Home", 143572, 8),
(8, "Pregnancy Test with Gold Nanoparticles",   "Pharmacy", 1298,   30),
(9, "48 Tennis Balls with butyl rubber and vermiculite (bucket)",   "Sports",   4999,   30),
(10, "Nosebleed Bandage with Aluminosilicate Nanoparticles (1 large)", "Pharmacy",  2400,   10)
*/
//(ItemID, ProductName, DepartmentName, Price, StockQuantity)
connection.query('SELECT * FROM Products', 
    function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("ItemID \t ProductName \t DepartmentName \t Price \t StockQuantity");
    console.log("-----------------------------------");
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].ItemID + "   " + res[i].ProductName + " \t " + res[i].DepartmentName + " \t " + res[i].Price + " \t " + res[i].StockQuantity);
    }
    console.log("-----------------------------------");

// Routes
// ===========================================================
app.get('/', function (req, res) {
    res.send('Welcome to the Bamazon Page!');
})

app.get('/:Product', function (req, res) {
    var chosen = req.params.Product;

    console.log(chosen);

    // QUESTION: What does this for loop loop do?
    for (var i = 0; i < tables.length; i++) {
        if (chosen === tables[i].Product) {
            res.json(tables[i]);
            return;
        }
    }

    res.send('No character found');
    console.log(chosen);
});

// Listener
// ===========================================================
//app.listen(PORT, function () {
//    console.log('App listening on PORT ' + PORT);
//});
var customerSelect = function() {
    console.log("What would you like to buy?")
    console.log("How much would you like to buy?")
 // prompt function
    inquirer.prompt([{
        name: "productName",
        message: "What Product would you like to buy? (Press E to exit)"

    }]).then(function(ansProd) {

          if (ansProd.productName.toUpperCase() == "E") {
            connection.end();
          } else {
            inquirer.prompt([{
                name: "StockQuantity",
                message: "How many would you like to buy?"
            }]).then(function(ansQty) {
               console.log(ansProd.productName);
              // console.log(ansQty.qty);
              connection.query('SELECT * FROM productName WHERE ?', {ProductName: ansProd.productName}, function(err, res) {
                if (err) throw err;
             
                  if (res[0].StockQuantity > ansQty.qty) {
                    // place order: calculate total cost of order
                    var cost = res[0].Price * ansQty.qty
                    console.log("-----------------------------------");
                    console.log("Your order has been placed! \nThe total cost is $" + cost.toFixed(2) + "\nThank you!")
                    // update StockQuantity amount
                      var newQty = res[0].StockQuantity - ansQty.qty
                      connection.query("UPDATE products SET ? WHERE ?", [{
                          StockQuantity: newQty
                      }, {
                          ProductName: ansProd.productName
                      }], function(err, res) {});
                    // else "Insufficient quantity.  Please request a quantity less than " + StockQuantity  
                  } else {
                    console.log("-----------------------------------");
                    console.log("Sorry, we do not have enough in stock. \nWe only have " + res[0].StockQuantity + " units of " + ansProd.product + ". \nPlease retry your order. \nThank you!")
                  }
                   
              })
              
              
            })
          }
    })

/*
app.post('/api/new', function (req, res) {
    var newOrder = req.body;

    console.log(newOrder);

    if (order[0].length <= 4) {
        order[0].push(newOrder)
    } else {
        order[1].push(newOrder)
    }
    
    res.json(newOrder);
})

app.get('/api', function (req, res) {
    res.json(order)
})
*/

// Starts the server to begin listening
// =============================================================
//app.listen(PORT, function () {
//    console.log('App listening on PORT ' + PORT)
//})

//customerSelect();
