var models = require('../ng-models')
var bcrypt = require('bcrypt')

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

	database_type: {
		type: String,
		enum: ["mongodb", "mysql", "mongolab"]
	},

	db_host: String,
	db_user: String,
	db_pass: String,
	db_name: String,
	db_port: Number,
	url: String
});

schema.index({
	user: 1,
	database_type: 1
});

schema.methods.createPassword = function(cb) {
	var self = this;

	crypto.randomBytes(32, function(ex, buf) {
		bcrypt.hash(buf.toString('hex'), 10, function(err, hash) {
			self.db_pass = hash;
			cb(self.db_pass);
		});
	});
}

module.exports = mongoose.model("Database", schema);