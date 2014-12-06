var mongoose = require('mongoose');

var resourceSchema = mongoose.Schema({
	name: String,
	type: String,
	location: {
		lat: Number,
		lng: Number
	},
	units: Number,
	reward: Number,
	toolRequired: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Item'
	}],
	recharge: Boolean,
	created: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model('Resource', resourceSchema)