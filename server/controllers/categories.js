var express = require('express');
var router = express.Router();
var path = require('path');

var Categories = require(path.join(__dirname, '..', 'services', 'categories'));

router.get('/', function(req, res){
        Categories.all(function(error, docs){
            if(error){
                console.log(error);
            }else{
                res.json(docs);
            }
        });
});

module.exports = router;
