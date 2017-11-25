var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var Products = require(path.join(__dirname, '..', 'models', 'products'));

router.post('/list', jsonParser, function(req, res){
        var searchInfo = req.body || {};

        Products.getItemsPerPage(searchInfo, function(err, docs){
            if(!err){
                res.json(docs);
            }
        });
});

router.get('/:id', function(req, res){
    var productId = req.params.id;

    Products.get(productId, function(err, doc){
        if(!err){
            res.json(doc);
        }
    })
});

module.exports = router;
