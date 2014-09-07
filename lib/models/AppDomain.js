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
	ssl: {
		type: Boolean,
		default: true
	},
	ssl_only: {
		type: Boolean,
		default: false
	},
	certificate: String,
	certificate_key: String
});

schema.index({
	user: 1,
	app: 1,
	domain: 1,
	is_subdomain: 1
});

module.exports = mongoose.model("AppDomain", schema);