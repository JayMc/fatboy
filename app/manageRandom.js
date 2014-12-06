 var random = require('node-random');

 random.quota(function(error, quota) {
	console.log("Remaining bytes: " + quota)
	if(quota<=1){
		callback(true)
	}else{
		callback(null)
	}
});

module.exports = {

 	var numbers = [],
 	next: function(){
 		if(!numbers.length<=1){
 			this.refill()
 		}else{
 			return this.numbers[0]
 		}
 	},
 	refill: function(){
 		for (var i = 0; i <= 10; i++) {
			function(callback){
				random.integers({minimum:0,maximum:100}, function(e,n){
					numbers.push(n);
					callback(null);
				})
			},
 		};
 	}
 	
}