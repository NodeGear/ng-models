var models = require('../ng-models')

var mongoose = models.mongoose
	, schema = mongoose.Schema
	, ObjectId = schema.ObjectId
	
var scheme = schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	// session id in redis
	session: String
});

scheme.index({
	user: 1
});

module.exports = mongoose.model("UserSession", scheme);