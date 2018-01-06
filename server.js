var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 6117;

//include routes
var eventsRouter = equire('./routes/events.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./public'));

//app routes
app.use('/events', eventsRouter);

// Listen //
app.listen(port, function(){
    console.log('Listening on port:', port);
 });