var bugsnag = require("bugsnag");

module.exports.mongoose = null;
module.exports.config = null;

module.exports.init = function(mongoose, config, other) {
	module.exports.mongoose = mongoose;
	module.exports.config = config;
	module.exports.other = other;
	
	bugsnag.register(config.credentials.bugsnag_key, {
		notifyReleaseStages: ["production"],
		releaseStage: config.production ? "production" : "development"
	});
}