var models = require('../ng-models')

var mongoose = models.mongoose
	, schema = mongoose.Schema
	, ObjectId = schema.ObjectId
	
var usageSchema = schema({
	time: Date,
	drone: { type: ObjectId, ref: 'App' },
	memory: Number, // bytes
	cpu: Number
})

usageSchema.statics.getUsageForDrone = function (droneID, limit, cb) {
	if (typeof limit === "function") {
		cb = limit;
		limit = 20;
	} else if (typeof cb !== "function") {
		return;
	}
	
	module.exports.find({
		drone: droneID,
	}).sort('time').limit(60).exec(function(err, usage) {
		if (err) throw err;
		
		cb(usage);
	})
}

module.exports = mongoose.model("Usage", usageSchema);