var People = require('./models/people');
var Item = require('./models/item');
var Resource = require('./models/resource');

var random = require('node-random');
var importcsv = require('./importcsv');
var async = require('async')

//create a guy
//createPerson()

//start the game loop
var interval = setInterval(checkTime, 60000)

//check if time to run sim
//get Date obj and checks mins of equal to 00 or something
function checkTime(){
	var d = new Date
	if(d.getMinutes() % 1 == 0){
		sim();
	}
}

function sim(){
	console.log('sim called every 5 mins')

	var healthToTake = 2;

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
			random.integers({minimum:0,maximum:5}, function(e,n){
				healthToTake = n;
				callback(null);
			})
		}	
		], function(err, results){
			if(err){
				console.log('modify person aborted, random.org quota exhausted')
				return
			}

			//run modules against people

			//get people not updated recently
			var query = {DOD: null}
			People.random(query, function(err, person){
				if(err){
					console.log(err)
					return
					
				}

				console.log('found a person')
				console.log(person)
				//check health
				if(person.health <= 0){
					//death
				}

				//check pregnancies due

				//person wants to sell something

				//person wants to buy something

				//minus health slightly
				person.health -= healthToTake;
					//if health <= 0 then death

				//set last update date
				person.lastUpdate = Date.now()

				person.save(function(err, person){
					if(err){
						console.log(err)
						return	
						
					}
					
					console.log('save a person')		
					console.log(person)
				})

		})

		
	})


}

function createPerson(){

	var location = {type:'', loc: {lat:0, lng: 0}};
	var name = {};
	var gender = '';
	var money = 0;
	var health = 100;

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
			importcsv.getFromList({type:'malefirstname'}, function(b){
				name.first = b;
				callback(null);
			})
		},
		function(callback){
			importcsv.getFromList({type:'familyname'}, function(b){
				name.last = b;
				callback(null);
			})
		},
		function(callback){
			random.integers({minimum:0,maximum:100}, function(e,n){
				location.type = 'current';
				location.loc.lat = n;
				callback(null);
			})
		},
		function(callback){
			random.integers({minimum:0,maximum:100}, function(e,n){
				location.loc.lng = n;
				callback(null);
			})
		},
		function(callback){
			random.integers({minimum:0,maximum:1}, function(e,n){
				(n==1?gender='female':gender='male');
				callback(null);
			})
		},
		function(callback){
			random.integers({minimum:800,maximum:1600}, function(e,n){
				money = n;
				callback(null);
			})
		},
		function(callback){
			random.integers({minimum:90,maximum:100}, function(e,n){
				health = n;
				callback(null);
			})
		},		
	], function(err, results){
		if(err){
			console.log('createPerson aborted')
			return err
		}
		var newPerson = new People({
				name: name,
				money: money,
				DOB: Date.now(),
				health: health,
				//locations: location,
				locations: [JSON.stringify(location)],
				gender: gender,
				lastUpdate: Date.now()
		})

		//newPerson.locations.push({type: location.type, loc: {lat: location.loc.lat, lng: location.loc.lng}});

		newPerson.save(function(err, p){
			if(err)
				console.log(err)

			console.log(p)

			//create an Item for this person
			var newItem = new Item({
				name: 'Axe',
				owner_id: p._id,
				condition: 100,
				level: 1,
				type: {
					tool: true
				}
			})

			newItem.save(function(err, i){
				if(err)
					console.log(err)

				console.log(i)
			})

		})

	})
	
	

	
	

	

	



}

module.exports = function(app){
	
}