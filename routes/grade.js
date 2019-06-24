var express = require('express');
var router = express.Router();
var Grade =  require("../model/grade.model");

/* GET customers listing. */
router.get('/', function(req, res, next) {
  Grade.find(req.query,null, {sort : {"name": "1"}}, function(err, gardes){
    if (err){
      res.send(err);
     }else{
         res.send(gardes);
     }
  })
});


router.post("/", function(req, res){

  console.log("req = ", req.body);

  var grade = new Grade(req.body);

  grade.save(function(err){
    console.log(err);
    if(err)
      res.send("err");
    else
      res.send("200! ok");
  });
  
});

module.exports = router;

