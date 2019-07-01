var express = require('express');
var router = express.Router();
var Shape = require("../model/shape.model");

router.get("/", function (req, res, next) {
    
    var query = {};
    Shape.find(query, function(err, shapes){
        if (err) {
            res.send("err");
          } else {
              console.log(shapes);
            res.send(shapes);
          }
    })

})
router.post("/",function(req, res){
    var body = req.body;

    var shape = new Shape(body);

    shape.save(err=>{
        err ? res.send(err) : res.send("200! OK")
    })


});

module.exports = router;