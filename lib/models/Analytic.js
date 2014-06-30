var models = require('../ng-models')

var mongoose = models.mongoose
	, schema = mongoose.Schema
	, ObjectId = schema.ObjectId
	
var analyticsSchema = schema({
	start: Date,
	app: {
		type: ObjectId,
		ref: 'App'
	},
	process: {
		type: ObjectId,
		ref: 'AppProcess'
	},
	hostname: String,
	found: { type: Boolean, default: false },
	method: String,
	url: String,
	statusCode: Number,
	reqSize: {
		type: Number,
		default: 0
	}, // Bytes
	resSize: {
		type: Number,
		default: 0
	}, // Bytes
	ip: String,
	websocket: {
		type: Boolean,
		default: false
	},
	error: {
		type: Boolean,
		default: false
	},
	errorCode: String,
	errno: String
});

schema.set('autoIndex', false);

schema.index({
	app: 1,
	process: 1
});

analyticsSchema.statics.getAnalyticsForDrone = function(drone, limit, sort, cb) {
	if (typeof limit === 'function') {
		cb = limit;
		limit = 100;
	}
	if (typeof limit === 'undefined') {
		limit = 100;
	}
	if (typeof sort === 'function') {
		cb = sort;
		sort = '-end'
	}
	if (typeof sort === 'undefined') {
		sort = '-end'
	}
	if (typeof cb !== 'function') {
		return;
	}
	
	module.exports.find({
		drone: drone._id
	}).sort(sort).limit(limit).exec(function(err, analytics) {
		if (err) throw err;
		
		cb(analytics)
	})
}

module.exports = mongoose.model("Analytic", analyticsSchema);