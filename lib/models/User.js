var models = require('../ng-models')

var mongoose = models.mongoose

var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;
var crypto = require('crypto')

var PublicKey = require('./PublicKey')

var config = models.config
	, jade = require('jade')
	, exec = require('child_process').exec
	, async = require('async')
	, bugsnag = require('bugsnag')

var userSchema = schema({
	created: {
		type: Date,
		default: Date.now
	},
	username: String,
	usernameLowercase: String,
	name: String,
	email: String,
	email_verified: {
		type: Boolean,
		default: false
	},
	password: String,
	admin: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	balance: {
		type: Number,
		default: 0.0
	},
	stripe_customer: String,
	default_payment_method: {
		type: ObjectId,
		ref: 'PaymentMethod'
	},
	tfa_enabled: {
		type: Boolean,
		default: false
	},
	tfa: {
		type: ObjectId,
		ref: 'TFA'
	}
});

userSchema.methods.setPassword = function(password) {
	var shasum = crypto.createHash('sha1');
	this.password = shasum.update("n©ear"+password+"<.%2€aa").digest('hex');
}

userSchema.statics.getHash = function (password) {
	var shasum = crypto.createHash('sha1');
	return shasum.update("n©ear"+password+"<.%2€aa").digest('hex');
}

userSchema.statics.taken = function (username, cb) {
	module.exports.findOne({
		usernameLowercase: username.toLowerCase()
	}, function(err, user) {
		if (err) throw err;

		var taken = (user == null) ? false : true;
		cb(taken)
	})
}

userSchema.statics.takenEmail = function (email, cb) {
	module.exports.findOne({
		email: email.toLowerCase()
	}, function(err, user) {
		if (err) throw err;

		var taken = (user == null) ? false : true;
		cb(taken)
	})
}

userSchema.statics.authenticate = function (token, cb) {
	module.exports.findOne({
		authToken: token
	}, function(err, user) {
		if (err) throw err;
		
		cb(user);
	})
}

userSchema.methods.generateToken = function (cb) {
	var self = this;
	crypto.randomBytes(48, function(ex, buf) {
		self.authToken = buf.toString('hex');
		self.save(function(err) {
			cb(self.authToken)
		})
	});
}

userSchema.methods.getPublicKey = function (cb) {
	var self = this
	PublicKey.findOne({
		user: self._id
	}, function(err, key) {
		if (err) throw err;
		
		cb(key);
	})
}

userSchema.methods.sendEmail = function(from, subject, view, locals) {
	var u = this;

	var html = jade.renderFile(config.path + '/views/' + view, locals);
	
	u.sendEmailText(from, subject, html);
};

userSchema.methods.sendEmailText = function(from, subject, html) {
	var u = this;

	if (!config.transport_enabled || !u.email) {
		return null;
	}

	var options = {
		from: from,
		to: u.name+" <"+u.email+">",
		subject: subject,
		html: html
	};

	config.transport.sendMail(options, function(error, response){
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent: " + response.message);
		}
	});

	return true;
}

userSchema.methods.notifyUser = function (subject, text) {
	var options = {
		from: "NodeGear Process Daemon <notifications@nodegear.com>",
		to: this.name+" <"+this.email+">",
		subject: subject,
		html: text+"<br/><br/><b>You are receiving this email because you are signed up on NodeGear.</b>"
	}
	transport.sendMail(options, function(err, response) {
		if (err) throw err;
		
		console.log("Email sent.."+response.message)
	})
}

userSchema.methods.getName = function () {
	return this.name.length > 0 ? this.name : this.email;
};

module.exports = mongoose.model('User', userSchema);