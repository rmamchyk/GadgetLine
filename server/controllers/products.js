var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

//uploading product images
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log('DESTINATION: ');
        console.log(req);
        callback(null, path.join(__dirname, '../..', 'public/uploads/'))
    },
    filename: function(req, file, callback) {
        console.log('FILENAME: ');
        console.log(file);
        var productFileName = file.fieldname  + req.body.code + '-' + Date.now() + path.extname(file.originalname);
        callback(null, productFileName)
    }
});
var upload = multer({storage: storage});

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

router.post('/update', upload.array('photos', 5), function(req, res){
    console.log(req.body);
    console.log(req.files);
    res.json({success: true});
});

module.exports = router;
