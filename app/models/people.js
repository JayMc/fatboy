var mongoose = require('mongoose');

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
	lastUpdate: Date
})

module.exports = mongoose.model('People', peopleSchema)