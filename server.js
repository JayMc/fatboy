var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');

//config
var db = require('./config/db.js');

mongoose.connect(db.url, function(err){
	if(err)
			throw err;
});


//app.use(express.logger('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	//res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
	//res.setHeader('Access-Control-Allow-Origin', 'http://jasonmciver.com');
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, token, accept, origin'); //added our custom 'token' for our user token
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	console.log('Client from: '+req.connection.remoteAddress);
	// Pass to next layer of middleware
	next();
});

// routes ==================================================
require('./app/routes')(app);
app.listen(7373);