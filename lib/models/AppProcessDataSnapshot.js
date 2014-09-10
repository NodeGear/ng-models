var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId;

var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	app: {
		type: ObjectId,
		ref: 'App'
	},
	originProcess: {
		type: ObjectId,
		ref: 'AppProcess'
	},
	originServer: {
		type: ObjectId,
		ref: 'Server'
	}
});

schema.index({
	app: 1,
	process: 1,
	fromServer: 1
});

module.exports = mongoose.model("AppProcessDataSnapshot", schema);