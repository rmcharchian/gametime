var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 6117;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./public'));

// Listen //
app.listen(port, function(){
    console.log('Listening on port:', port);
 });