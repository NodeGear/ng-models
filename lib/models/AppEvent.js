var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, crypto = require('crypto')
	
var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	app: {
		type: ObjectId,
		ref: 'App'
	},
	process: {
		type: ObjectId,
		ref: 'AppProcess'
	},
	name: String, //e.g. Restart
	message: String, //e.g. App restarted <a href="loglink">log</a>
});

schema.statics.AddEvent = function (_id, app_id, name, message) {
	new models.AppEvent({
		app: app_id,
		process: _id,
		name: name,
		message: message
	}).save();
}

module.exports = mongoose.model("AppEvent", schema);