module.exports = {};

var manifest = require('../lib/manifest.json').models;

var models = require('../lib/ng-models');
module.exports.init = function() {
	models.init.apply(this, arguments);

	loadManifest();

	// so that you can call require('ng-models').init(mongoose) and it'd stil work
	return module.exports;
}

function loadManifest () {
	manifest.forEach(function(model) {
		console.log(model);
		module.exports[model] = require('../lib/models/'+model);
	});
}