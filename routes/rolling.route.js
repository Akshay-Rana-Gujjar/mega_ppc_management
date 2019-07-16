var express = require('express');
var router = express.Router();
var Rolling = require("../model/rolling.model");



router.get("/", (req, res)=>{

    Rolling.find({},function(err, rollingData){

        if(err)
            res.status(500).send(err);
        else
            res.send(rollingData);
        
    })



});



module.exports = router;

