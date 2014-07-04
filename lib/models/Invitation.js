var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, crypto = require('crypto')
	
var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: ObjectId,
		ref: 'User'
	},
	confirmed: Date,
	confirmed_by: {
		type: ObjectId,
		ref: 'User'
	}
});

schema.index({
	user: 1
});

module.exports = mongoose.model("Invitation", schema);