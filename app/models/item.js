var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	name: String,
	owner_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'People'
	},
	price: Number,
	condition: Number,
	units: Number,
	level: Number,
	type: {
		tool: Boolean,
		food: Boolean,
		resource: Boolean,
	},
	tradeHistory:[{
		sold_by: {
			type: mongoose.Schema.ObjectId,
			ref: 'People'
		},
		bought_by: {
			type: mongoose.Schema.ObjectId,
			ref: 'People'
		},
		traded: Date,
		price: Number,
	}]

})

module.exports = mongoose.model('Item', itemSchema)