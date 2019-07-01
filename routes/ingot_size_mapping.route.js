var express = require('express');
var router = express.Router();
var IngotSizeMapping = require("../model/ingot_size_mapping.model");



router.post("/", function(req, res){

    var body = req.body;

    var newMapping = new IngotSizeMapping(body);

    newMapping.save(function(err){
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send("200 OK!");
        }
    });


})


module.exports = router;



