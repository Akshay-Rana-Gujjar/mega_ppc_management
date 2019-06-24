var express = require('express');
var router = express.Router();
var ProductHead =  require("../model/shape.model");

/* GET orders listing. */
router.get('/', function(req, res, next) {

    ProductHead.find(req.query, function(err, product_head){
        if (err){
            res.send("err");
           }else{
               res.send(product_head);
           }
    });
});


router.post("/", function(req, res){

  console.log("req = ", req.body);

  var product_head = new ProductHead(req.body);

  product_head.save(function(err){
    console.log(err);
    if (err){
     res.send("err");
    }else{
        res.send("200! ok");
    }
  });


});

module.exports = router;

