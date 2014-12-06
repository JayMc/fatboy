var People = require('./models/people');
var Item = require('./models/item');
var Task = require('./models/task');
var Resource = require('./models/resource');

var random = require('node-random');
var importcsv = require('./importcsv');
var async = require('async');
var _ = require('lodash');

//create a guy
//createPerson()
sim()

//start the game loop
var interval = setInterval(checkTime, 60000)

//check if time to run sim
//get Date obj and checks mins of equal to 00 or something
function checkTime(){
	var d = new Date
	if(d.getMinutes() % 1 == 0){
		//sim();
	}
}

//find user
function sim(){
	console.log('sim called every 5 mins')

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
		}], function(err, results){
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

				if(!person){
					console.log('No one found')
					return
				}

				console.log('found a person')
				console.log(person)
				modifyUser(person)
			})

		
		})
}

//after find user, make changes
function modifyUser(person){

	var healthToTake = 2;

	async.series([
		function(callback){
			console.log('calc minus health')
			random.integers({minimum:0,maximum:5}, function(e,n){
				healthToTake = n;
				callback(null);
			})
		},		
		function(callback){
			console.log('minus health')
			//minus health slightly
			person.health -= healthToTake;
			callback(null)
		},
		function(callback){
			console.log('check tasks')
			//check if a task is in duration
			console.log(_.where(person.tasks, {'type':'water'}));
			//if(_.where(person.tasks, {'type':'water'})

				//if no tasks, create a task (find something to do)
				//check if person has water
				Item
					.find({owner_id: person._id, type: {food: true}})
					.exec(function(err, items){
						if(err){
							console.log(err)
							return	
						}

						if(items.length == 0){
							console.log('No water items found')

							//find water resource
							Resource
								.findOne({type: 'water'})
								.exec(function(err, resource){
									if(err){
										console.log(err)
										callback(null)	
									}

									if(!resource){
										console.log('no water resources found')
										callback(null)
									}

									console.log(resource)

									//create task to goto water
									// person.tasks.push(JSON.stringify({
									// 	type: 'water',
									// 	priority: 0,
									// 	description: 'Goto water',
									// 	location: resource.location,
									// 	duration: 1,
									// 	created: Date.now()
									// }))

									//create task to drink water
									var newTask = new Task({
										type: 'water',
										priority: 1,
										description: 'Drink water',
										location: resource.location,
										duration: 1,
										created: Date.now()
									});

									People.update({'_id':person._id},
									{$push:{ tasks: newTask}},
									function(err) {
										if(err){
									        console.log(err);
										}else{
											console.log('updated')
										}

									})

									callback(null)

								})


							return
						}else{
							console.log('water item found')
							//create task to drink water item
							callback(null)
						}


					})
		},
		function(callback){
			//check health
			if(person.health <= 0){
				//death
				person.DOD = Date.now()
			}
			callback(null)
		}				
	],function(){
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