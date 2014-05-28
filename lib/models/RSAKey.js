var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, crypto = require('crypto')
	
var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	deleted: {
		type: Boolean,
		default: false
	},

	user: {
		type: ObjectId,
		ref: 'User',
		required: true
	},

	name: {
		type: String,
		required: true
	},
	nameLowercase: {
		type: String,
		lowercase: true,
		required: true
	},

	system_key: {
		type: Boolean,
		default: false
	},

	private_key: String,
	public_key: String,

	installed: {
		type: Boolean,
		default: false
	},
	installing: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("RSAKey", schema);