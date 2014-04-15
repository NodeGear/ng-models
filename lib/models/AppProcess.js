var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, crypto = require('crypto')
	
var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: ""
	},
	app: {
		type: ObjectId,
		ref: 'App'
	},
	running: {
		type: Boolean,
		default: false
	},
	server: {
		type: ObjectId,
		ref: 'Server'
	},
	restarts: {
		type: Number,
		default: 0
	},
	deleted: {
		type: Boolean,
		default: false
	}
});

schema.pre('save', function (next) {
	var app_process = this;
	var modified = app_process.modifiedPaths();

	for (var i = 0; i < modified.length; i++) {
		if (modified[i] == 'running') {
			app_process.running_modified = true;

			break;
		}
	}

	next();
})
schema.post('save', function (app_process) {
	if (app_process.running_modified === true) {
		if (!models.other.redis) {
			console.log('no redis aww');
			return;
		}

		models.other.redis.publish('pm:app_running', app_process._id+'|'+app_process.running);
	}
})

module.exports = mongoose.model("AppProcess", schema);