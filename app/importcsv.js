var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

module.exports = {
	getFromList: function(options, cb){
		var self = this

		if(options.type === 'malefirstname'){
			self.importcsv('male-names', function(d){
				cb(d)
			})

		}else if(options.type === 'femalefirstname'){
			self.importcsv('female-names', function(d){
				cb(d)
			})

		}else if(options.type === 'familyname'){
			self.importcsv('Family-Names', function(d){
				cb(d)
			})

		}else{
			cb(null)
		}

	},

	importcsv: function(csvFile, cb){
		var self = this
		var results = [];
		var result = '';

		var csvFileName = './csvs/'+csvFile;
		var fileStream = fs.createReadStream(csvFileName);
		//new converter instance
		var csvConverter = new Converter({constructResult:true});

		csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex){
			//console.log(rawRow[0]);
			results.push(rawRow[0]);
		});

		//end_parsed will be emitted once parsing finished
		csvConverter.on("end_parsed", function(jsonObj){
		
		   	results = self.shuffle(results)
			cb(self.capitaliseFirstLetter(results[0]))
		});

		//read from file
		fileStream.pipe(csvConverter);
	},

	shuffle: function(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	},
	capitaliseFirstLetter: function(string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
}