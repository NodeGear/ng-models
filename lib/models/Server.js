var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, crypto = require('crypto')
	
var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: String,
	location: String,
	identifier: String,
	price_per_hour: Number
});

module.exports = mongoose.model("Server", schema);