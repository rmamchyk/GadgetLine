// GLOBAL because it's used everywhere
path = require('path');

var express = require('express');
var app = express();

// Connect to Mongo
var dbConnection = require(path.join(__dirname, 'services', 'dbConnection'));
dbConnection.connect();

app.use(express.static(path.join(__dirname, '..', 'public')));

// Load controllers
app.use(require(path.join(__dirname, 'controllers','routes')));

//Api
app.get('/', function(request, response){
    response.send("Hi there! I'm GadgetLine ExpressJS service.\n");
});

app.listen(3000, function(){
    console.log('Listening on port 3000...');
});

module.exports = app;

// Set absolute paths for partials
app.locals.basedir = path.join(__dirname, '');