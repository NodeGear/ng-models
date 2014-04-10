var bugsnag = require("bugsnag");

module.exports.mongoose = null;
module.exports.config = null;

module.exports.init = function(mongoose, config) {
	module.exports.mongoose = mongoose;
	module.exports.config = config;

	var releaseStage = config.env;

	bugsnag.register("c0c7568710bb46d4bf14b3dad719dbbe", {
		notifyReleaseStages: ["production"],
		releaseStage: releaseStage
	});
}