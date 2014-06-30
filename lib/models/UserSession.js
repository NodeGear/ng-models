var models = require('../ng-models')

var mongoose = models.mongoose
	, schema = mongoose.Schema
	, ObjectId = schema.ObjectId
	
var schema = schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	// session id in redis
	session: String
});

schema.set('autoIndex', false);

schema.index({
	user: 1
});

module.exports = mongoose.model("Usage", schema);