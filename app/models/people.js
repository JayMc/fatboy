var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
	type: String,
	priority: Number,
	description: String,
	location: {
			lat: Number,
			lng: Number
	},
	duration: Number,
	created: Date,
	completed: Date

})

var peopleSchema = mongoose.Schema({
	name: {
		first: String,
		last: String
	},
	family: {
		children: [{
			people_id: {
				type: mongoose.Schema.ObjectId,
				ref: 'People'
			},
			type: String
		}],
		parents: [{
			mother: {
				type: mongoose.Schema.ObjectId,
				ref: 'People'
			},
			father: {
				type: mongoose.Schema.ObjectId,
				ref: 'People'
			}
		}],

	},
	partner: {
		people_id: {
				type: mongoose.Schema.ObjectId,
				ref: 'People'
		},
		type: String,
		since: Date
	},
	money: Number,
	DOB: Date,
	DOD: Date,
	gender: String,
	pregnant: {
		state: Boolean,
		since: Date
	},
	health: Number,
	mood: String,
	personality: {
		kindness: Number,
		greed: Number,
		honesty: Number,
		endurance: Number,
		intelligence: Number,
	},
	locations: [{
			type: String, //current location / home
			loc: {
				lat: Number,
				lng: Number
			}
	}],
	trade: {
		buying:[{
			item_id: {
				type: mongoose.Schema.ObjectId,
				ref: 'Item'
			},
		}],
		selling:[{
			item_id: {
				type: mongoose.Schema.ObjectId,
				ref: 'Item'
			},
		}]
	},
	tasks: [taskSchema], //tast Schema here (not Model) allows us to use $push
	lastUpdate: Date
})

peopleSchema.statics.random = function(query, cb) {
	this.count(function(err, count) {
		if (err)
			return cb(err);

		var rand = Math.floor(Math.random() * count);
		this.findOne(query).skip(rand).exec(cb);

	}.bind(this));
}; 

module.exports = mongoose.model('People', peopleSchema)