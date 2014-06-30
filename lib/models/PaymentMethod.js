var models = require('../ng-models')

var mongoose = models.mongoose
var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;

var scheme = schema({
	type: {
		type: String,
		default: 'card'
	},
	id: String,
	name: String,
	cardholder: String,
	created: {
		type: Date,
		default: Date.now()
	},
	last4: String,
	disabled: {
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

module.exports = model = mongoose.model('PaymentMethod', scheme);