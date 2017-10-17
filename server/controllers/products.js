var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var Products = require(path.join(__dirname, '..', 'models', 'products'));

router
    .post('/search', jsonParser, function(req, res){
        var searchInfo = req.body || {};

        Products.getItemsPerPage(searchInfo, function(err, docs){
            if(err){
                console.log(err);
            }else{
                res.json(docs);
            }

        });
    });

module.exports = router;
