var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var multer = require('multer');
var _ = require('underscore');

//uploading product photos
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, '../../', 'public/uploads/'))
    },
    filename: function(req, file, callback) {
        var product = req.body;
        console.log(product);
        var imageId = Math.random().toString(36).substr(2, 9);

        var imageName = product.code + '-' + imageId + path.extname(file.originalname);
        console.log(imageName);
        if(!product.images || !Array.isArray(product.images) || !_.some(product.images, function(img){return img && img.length>0})){
            product.images = [];
        }

        product.images.push(imageName);
        callback(null, imageName)
    }
});
var upload = multer({storage: storage});

var Products = require(path.join(__dirname, '..', 'services', 'products'));

router.post('/list', jsonParser, function(req, res){
        var searchInfo = req.body || {};

        Products.getItemsPerPage(searchInfo, function(err, docs){
            if(!err){
                res.json(docs);
            }
        });
});

router.get('/:id', function(req, res){
    var productCode = req.params.id;

    Products.get(productCode, function(err, doc){
        if(!err){
            res.json(doc);
        }
    })
});

router.post('/update', upload.fields([{ name: 'photos[]', maxCount: 10 }]), function(req, res){
    var data = req.body;

    var product = {
        _id: data._id,
        code: data.code,
        title: data.title,
        price: parseFloat(data.price),
        categoryId: parseInt(data.categoryId),
        images: data.images || []
    };

    Products.update(product, function(err){
        res.json({success: !err, product: product});
    });
});

module.exports = router;
