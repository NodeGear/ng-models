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
	email: String,
	code: String,
	verified: {
		type: Boolean,
		default: false
	},
	verifiedDate: Date
});

schema.methods.generateCode = function(cb) {
	var self = this;

	crypto.randomBytes(6, function(ex, buf) {
		self.code = buf.toString('hex').substring(0, 5).toUpperCase();
		cb(self.code);
	});
};

module.exports = mongoose.model("EmailVerification", schema);