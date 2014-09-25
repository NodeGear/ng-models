module.exports.mongoose = null;
module.exports.config = null;

module.exports.init = function(mongoose, config, other) {
	module.exports.mongoose = mongoose;
	module.exports.config = config;
	module.exports.other = other;
}