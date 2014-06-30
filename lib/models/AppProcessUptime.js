var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, App = require('./App')
	
var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: ObjectId,
		ref: 'User'
	},
	app: {
		type: ObjectId,
		ref: 'App'
	},
	process: {
		type: ObjectId,
		ref: 'AppProcess'
	},
	server: {
		type: ObjectId,
		ref: 'Server'
	},
	minutes: {
		type: Number,
		default: 0
	},
	start: Date, // When process is started
	end: Date, // When process exit
	sealed: { // When true, don't touch.
		type: Boolean,
		default: false
	},
	price_per_hour: Number,
	paid: {
		type: Boolean,
		default: false
	}
});

schema.set('autoIndex', false);

schema.index({
	user: 1,
	app: 1,
	process: 1,
	server: 1,
	paid: 1
});

schema.methods.setUser = function() {
	var self = this;

	App.findOne({
		_id: self.app
	}).select('user').exec(function(err, app) {
		if (err) throw err;

		self.user = app.user;

		self.save();
	})
}

module.exports = mongoose.model("AppProcessUptime", schema);