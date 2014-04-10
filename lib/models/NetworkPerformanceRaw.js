var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, config = models.config

var connection = mongoose.createConnection(config.networkDb, config.networkDb_options);

var schema = mongoose.Schema({
	lag: Number,
	responseTime: Number,
	responseLength: Number,
	responseStatus: Number,
	responseMethod: String,
	requestPath: String,
	user: {
		type: ObjectId
	},
	requestTime: Date,
	unix_seconds: Number
});

module.exports = connection.model("RawData", schema);