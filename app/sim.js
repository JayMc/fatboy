var People = require('./models/people');
var random = require('node-random');
var importcsv = require('./importcsv');
var async = require('async')

//create a guy
createPerson()

//start the game loop
var interval = setInterval(checkTime, 60000)

//check if time to run sim
//get Date obj and checks mins of equal to 00 or something
function checkTime(){
	var d = new Date
	console.log('checking mins '+d.getMinutes())
	if(d.getMinutes() % 5 == 0){
		sim();
	}
}

function sim(){
	console.log('sim called every 5 mins')

	//run modules against people

	//get people not updated recently

	//check health

	//check pregnancies due

	//person wants to sell something

	//person wants to buy something

	//set last update date

}

function createPerson(){

	importcsv.getFromList({type:'malefirstname'},function(b){
		console.log(b)
	})

	var location = {loc: {lat:0, lng: 0}};
	var name = {};
	var gender = '';
	var money = 0;

	async.series([
		function(callback){
			importcsv.getFromList({type:'malefirstname'}, function(b){
				name.first = b
				callback(null)

			})
		},
		function(callback){
			importcsv.getFromList({type:'familyname'}, function(b){
				name.last = b
				callback(null)

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
				callback(null)

			})
		},
		function(callback){
			random.integers({minimum:0,maximum:1}, function(e,n){
				(n==1?gender='female':gender='male')
				callback(null)
				
			})
		},
		function(callback){
			random.integers({minimum:800,maximum:1600}, function(e,n){
				money = n
				callback(null)

			})
		},
	], function(err, results){
		console.log(name)
		console.log(location)
		var newPerson = new People({
				name: name,
				money: money,
				DOB: Date.now(),
				//locations: [location],
				locations: array(),
				gender: gender,
				lastUpdate: Date.now()
		})

		newPerson.location.push(location);

		newPerson.save(function(err, p){
			if(err)
				console.log(err)

			console.log(p)
		})
	})
	
	

	
	

	

	



}

module.exports = function(app){
	
}