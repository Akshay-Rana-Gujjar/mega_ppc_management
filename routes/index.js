var express = require('express');
var router = express.Router();
var Product = require("../model/product.model");
var Order = require("../model/order.model");

var Rolling = require("../model/rolling.model");
var Customer = require("../model/customer.model");

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.redirect("/all-orders");
  res.redirect("/new-order");
  // res.render('index', { title: 'Express' });
});



router.get("/orders", function (req, res) {

  res.render("order");
})

router.get("/new-order", function (req, res) {


  res.render("new_order");
});


router.get("/all-orders", function (req, res) {

  Order.find({}, null, { sort: { '_id': -1 } }, function (err, orderDetails) {


    console.log("orderDetails =", orderDetails);

    res.render("all_orders", { orderDetails: orderDetails });

  });
});


router.post("/new-order", function (req, res) {

  var body = req.body;

  var { product, size, quantity } = body;
  console.log("body =", body);
  // orderNew(product, quantity);

  Order.create(body, function () {
    res.send("from order save.");
  });



  // Product.find({ "name": product }, function (err, productDetails) {

  //   console.log(productDetails);
  //   var productDetailsFromDB = productDetails[0];


  //   if (productDetailsFromDB.ready - quantity < 0) {
  //     var ingotTotalQuntity = Math.abs(productDetailsFromDB.ready - quantity);

  //     Product.update({ "name": "ingots" }, { $inc: { "required": ingotTotalQuntity } }, function (err, numAffected) {

  //       console.log("\n\n=========\n\n", "updated!!", "\n\n=========");
  //       res.send("okk!!");
  //     });
  //   }

  // })




  // =======================================================
  // ==================== Order Fuction ====================
  // =======================================================


  function orderNew(product, quantity) {

    if (!product) {
      console.log("check product =", product);
      return;
    }


    if (product != "ingots") {
      Product.find({ "name": product }, function (err, productFromDB) {

        var productDifference = productFromDB[0].ready - quantity;


        if (productDifference < 0) {
          // when quantity is more than ready product. 

          var ingotNewRequiredQuantity = Math.abs(productDifference);
          // TODO call self for ingot entry
          Product.update({ "name": product }, { $inc: { "required": ingotNewRequiredQuantity } }, function (err, numAffected) {

            console.log("\n\n=========\n\n", "updated!!", "\n\n=========");
            console.log(err);
            orderNew("ingots", productDifference);
          });



        } else {

          Product.update({ name: product }, { $inc: { "ready": -ingotNewRequiredQuantity } }, function (err, affectedRows) {
            // res.send("updated from else in !ingot.");

          })
        }
      })
    } else {

      Product.find({ name: product }, function (err, productFromDB) {

        var productDifference = productFromDB[0].ready - quantity;

        if (productDifference < 0) {
          // when quantity is more than ready product.
          productDifference = Math.abs(productDifference);

          Product.update({ "name": "ingots" }, { $inc: { "required": productDifference } }, function (err, numAffected) {

            console.log("\n\n=========\n\n", "updated!!", "\n\n=========");
            // res.send("okk!!");
          });
        } else {
          // productDifference = parseInt(productDifference)
          Product.update({ name: product }, { $inc: { "ready": -productDifference } }, function (err, affectedRows) {
            // res.send("updated from else in !ingot.");
          });
        }
      });


    }
  }
});


router.get("/all-products", function (req, res) {

  Product.find(function (err, products) {
    res.render("all_products", { products });
  });
});



router.get("/rolling-out", function (req, res) {


  res.render("rolling_out");

});

router.get("/rolling-in", function (req, res) {


  res.render("rolling_in");

});


router.post("/rolling-out", function (req, res) {

  var body = req.body;
  console.log("\n\nbody ", body);

  Rolling.create(body, function (err) {
    res.send("Added!");
  })

});


router.post("/rolling-in", function (req, res) {

  

  res.render("rolling_in");

});


router.get("/customer", function(req, res, next){

  Customer.find(function(err, customerData){

    if(err){
      next();
    }

    res.render("customer", {customerData});

  });
});

router.get("/approval-panel", function(req, res){

  var productStructure = {};

  Product.find(function(err, products){

    products.map(function(productData){

      if(!productStructure[productData.name]){
        productStructure[productData.name] = {};
      }
      if(!productStructure[productData.name][productData.grade])
        productStructure[productData.name][productData.grade] = {};
      productStructure[productData.name][productData.grade][productData.size]=productData; 
    });
    // map finish

    Order.find({status: "not approval"}, null, { sort: { '_id': -1 } }, function(err, orderData){

      res.render("approval_panel", {orderData, productStructure});

    });
  })
})


router.get("/products", function(req, res, next){

  Product.find(function(err, products){

    if (err){
      next();
    }

    res.render("products" , {products});

  });


  

});

module.exports = router;
