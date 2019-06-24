var express = require('express');
var router = express.Router();
var Customer =  require("../model/customer.model");

/* GET customers listing. */
router.get('/', function(req, res, next) {
  Customer.find(req.query,null, {sort : {"name":"1"}}, function(err, customers){
    if (err){
      res.send(err);
     }else{
         res.send(customers);
     }
  })
});


router.post("/", function(req, res){

  console.log("req = ", req.body);

  var customer = new Customer(req.body);

  customer.save(function(err){
    console.log(err);
    if(err)
      res.send("err");
    else
      res.send("200! ok");
  });
  
});

module.exports = router;

