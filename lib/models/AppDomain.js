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
	user: {
		type: ObjectId,
		ref: 'User'
	},
	domain: String,
	tld: String,
	is_subdomain: {
		type: Boolean,
		default: false
	}
});

schema.index({
	user: 1,
	app: 1,
	domain: 1,
	is_subdomain: 1
});

module.exports = mongoose.model("AppDomain", schema);