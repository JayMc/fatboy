var People = require('./models/people');
var Item = require('./models/item');
var Resource = require('./models/resource');

var random = require('node-random');
var async = require('async')
var urlPrefix = '/api'

module.exports = function(app){
	app.get(urlPrefix+'/people', function(req, res){
		People
			.find()
			.exec(function(err, people){
				if(err)
						return res.json(err)

				return res.json(people)
			})
	})

	app.post(urlPrefix+'/people', function(req, res){
		console.log(req.body)

		var newPerson = new People({
			name: {
				first: req.body.name.first
			}
		})

		newPerson.save(function(err, people){
			if(err)
					return res.json(err)

			return res.json(people)
		})
		
	})

	app.post(urlPrefix+'/resource', function(req, res){

		var location = {lat:0, lng: 0};
		var units = 1000;
		var reward = 2;

		async.series([
		function(callback){
			//first check remain quota from random.org
			random.quota(function(error, quota) {
			    	console.log("Remaining bytes: " + quota)
			    	if(quota<=1){
			    		callback(true)
			    	}else{
			    		callback(null)
			    	}
				});
			},				
			function(callback){
				random.integers({minimum:500,maximum:10000}, function(e,n){
					units = n;
					callback(null);
				})
			},
			function(callback){
				random.integers({minimum:1,maximum:5}, function(e,n){
					reward = n;
					callback(null);
				})
			},			
			function(callback){
				random.integers({minimum:0,maximum:100}, function(e,n){
					location.lat = n;
					callback(null);
				})
			},
			function(callback){
				random.integers({minimum:0,maximum:100}, function(e,n){
					location.lng = n;
					callback(null);
				})
			},			
		],function(err, results){
			if(err){
				console.log('newResource aborted')
				return res.json('random.org quota exhausted')
			}
			var newResource = new Resource({
				name: req.body.name,
				type: req.body.type,
				location: {
					lat: location.lat,
					lng: location.lng
				},
				units: units,
				reward: reward
			})

			newResource.save(function(err, resource){
				if(err)
						return res.json(err)
					
				return res.json(resource)
			})

		})

		
	})

}