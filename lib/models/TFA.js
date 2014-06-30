var models = require('../ng-models')

var mongoose = models.mongoose
var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;

var scheme = schema({
	created: {
		type: Date,
		default: Date.now
	},
	key: String,
	confirmed: {
		type: Boolean,
		default: false
	},
	user: {
		type: ObjectId,
		ref: 'User'
	}
});

scheme.index({
	user: 1
});

module.exports = model = mongoose.model('TFA', scheme);