// GLOBAL because it's used everywhere
path = require('path');

var express = require('express');
var multer = require('multer');

var app = express();

// Connect to Mongo
var dbConnection = require(path.join(__dirname, 'services', 'dbConnection'));
dbConnection.connect();

app.use(express.static(path.join(__dirname, '..', 'public')));

// Load controllers
app.use(require(path.join(__dirname, 'controllers','routes')));

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, '..', 'public/uploads/'))
    },
    filename: function(req, file, callback) {
        console.log(file);
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({storage: storage});

//Api
app.get('/', function(req, res){
    res.send("Hi there! I'm GadgetLine ExpressJS service.\n");
});

//app.post('/', upload.single('file'), function(req, res){
//        res.send('File was uploaded!');
//});

app.listen(8181, function(){
    console.log('Listening on port 8181...');
});

module.exports = app;

// Set absolute paths for partials
app.locals.basedir = path.join(__dirname, '');