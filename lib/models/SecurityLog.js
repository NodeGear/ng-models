var models = require('../ng-models')

var mongoose = models.mongoose
	, schema = mongoose.Schema
	, ObjectId = schema.ObjectId
	
var scheme = schema({
	created: {
		type: Date,
		default: Date.now
	},
	pretender: {
		type: ObjectId,
		ref: 'User'
	},
	victim: {
		type: ObjectId,
		ref: 'User'
	},
	requestBody: {},
	url: String,
	method: String,
	statusCode: Number,
	ip: String
});

scheme.index({
	pretender: 1,
	victim: 1
});

module.exports = mongoose.model("SecurityLog", scheme);