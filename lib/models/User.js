var models = require('../ng-models')
var bcrypt = require('bcrypt')

var mongoose = models.mongoose

var schema = mongoose.Schema;
var ObjectId = schema.ObjectId;
var crypto = require('crypto');

var App = require('./App')

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
	invitation_complete: {
		type: Boolean,
		default: false
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
	is_new_pwd: {
		type: Boolean,
		default: false
	},
	updatePassword: {
		type: Boolean,
		default: false
	},
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

userSchema.index({
	nameLowercase: 1,
	email: 1,
	disabled: 1
});

userSchema.methods.setPassword = function(password) {
	var shasum = crypto.createHash('sha1');
	this.password = shasum.update("n©ear"+password+"<.%2€aa").digest('hex');
}

userSchema.statics.getHash = function (password) {
	var shasum = crypto.createHash('sha1');
	return shasum.update("n©ear"+password+"<.%2€aa").digest('hex');
}

userSchema.statics.hashPassword = function(password, cb) {
	bcrypt.hash(password, 10, function(err, hash) {
		cb(hash);
	});
}

userSchema.methods.comparePassword = function (password, cb) {
	bcrypt.compare(password, this.password, function(err, res) {
		// res is boolean
		cb(res);
	})
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

userSchema.methods.sendEmail = function (from, subject, view, locals) {
	var u = this;

	var html = jade.renderFile(config.path + '/views/' + view, locals);
	
	u.sendEmailText(from, subject, html);
};

userSchema.methods.sendEmailText = function (from, subject, html) {
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

userSchema.methods.getApps = function (cb) {
	var q = App.find({
		user: this._id,
		deleted: false
	});
	q.select('name nameUrl deleted')
	q.sort('nameLowercase')
	q.exec(function(err, apps) {
		if (err) throw err;
		
		cb(apps);
	})
}

userSchema.methods.getName = function () {
	return this.name.length > 0 ? this.name : this.email;
};

module.exports = mongoose.model('User', userSchema);