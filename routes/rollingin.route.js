var express = require('express');
var router = express.Router();
var Rolling = require("../model/rolling_in.model");



router.get("/", (req, res)=>{

    var query = req.query;
    Rolling.find(query,function(err, rollingData){

        if(err)
            res.status(500).send(err);
        else
            res.send(rollingData);
        
    });
});



module.exports = router;

