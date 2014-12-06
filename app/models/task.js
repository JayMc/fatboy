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

module.exports = mongoose.model('Task', taskSchema)