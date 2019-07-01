var express = require('express');
var router = express.Router();
var Product =  require("../model/product.model");

/* GET orders listing. */
router.get('/', function(req, res, next) {

    Product.find(req.query, function(err, products){
        if (err){
            res.send("err");
           }else{
               res.send(products);
           }
    });
});


router.post("/", function(req, res){

  console.log("req = ", req.body);

  var products = new Product(req.body);

  products.save(function(err){
    console.log(err);
    if (err){
     res.status(500).send("err");
    }else{
        res.send("200! ok");
    }
  });


});

module.exports = router;

