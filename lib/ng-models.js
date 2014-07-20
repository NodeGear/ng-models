var bugsnag = require("bugsnag");

module.exports.mongoose = null;
module.exports.config = null;

module.exports.init = function(mongoose, config, other) {
	module.exports.mongoose = mongoose;
	module.exports.config = config;
	module.exports.other = other;
	
	if (!config.is_testing) {
		bugsnag.register(config.credentials.bugsnag_key, {
			notifyReleaseStages: ["production"],
			releaseStage: config.production ? "production" : "development"
		});
	} else {
		bugsnag.register('', {
			autoNotify: false
		})
	}
}