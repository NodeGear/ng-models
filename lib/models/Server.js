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
	price_per_hour: Number,
	app_memory: Number,
	appLimit: {
		type: Number,
		default: 20
	},
	appsRunning: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Server", schema);