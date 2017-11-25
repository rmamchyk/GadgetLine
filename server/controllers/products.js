var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var Products = require(path.join(__dirname, '..', 'models', 'products'));

router
    .post('/list', jsonParser, function(req, res){
        var searchInfo = req.body || {};

        console.log(req.body);
        Products.getItemsPerPage(searchInfo, function(err, docs){
            if(err){
                console.log(err);
            }else{
                res.json(docs);
            }

        });
    });

module.exports = router;
