var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, crypto = require('crypto')
	
var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	app: {
		type: ObjectId,
		ref: 'App'
	},
	name: String,
	value: String
});

schema.set('autoIndex', false);

schema.index({
	app: 1
});

module.exports = mongoose.model("AppEnvironment", schema);