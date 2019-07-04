var express = require('express');
var router = express.Router();
var Order = require("../model/order.model");

/* GET orders listing. */
router.get('/', function (req, res, next) {

  var query = req.query;

  if(query.order_date_timestamp){
    query.order_date_timestamp = JSON.parse(query.order_date_timestamp);

  }else if(query.delivery_date_timestamp){
    query.delivery_date_timestamp = JSON.parse(query.delivery_date_timestamp);
  }
  console.log(query);

  Order.find(query, null, { sort: { '_id': -1 }}, function (err, orders) {
    if (err) {
      res.send("err");
    } else {
      res.send(orders);
    }
  });
});


router.post("/", function (req, res) {

  console.log("req = ", req.body);

  req.body.order_date = new Date(req.body.order_date).getTime() / 1000;
  req.body.delivery_date = new Date(req.body.delivery_date).getTime() / 1000;

  var orders = new Order(req.body);

  orders.save(function (err) {
    console.log(err);
    if (err) {
      res.send("err");
    } else {
      res.send("200! ok");
    }
  });


});


router.put("/:id", function(req, res){

  var orderId = req.params.id;
  var updateQuery = req.body;
  Order.update({_id: orderId}, {$set:updateQuery}, function(err, count){

    if(err){
      return res.send(500, {error : err});
    }
    res.send(count);
  })

});

module.exports = router;

