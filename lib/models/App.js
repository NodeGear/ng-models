var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, async = require('async')
	//, ansi2html = new (require('ansi-to-html'))
	, fs = require('fs')

var schema = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	app_type: {
		type: String,
		default: 'node',
		required: true
	},
	name: String,
	nameUrl: String, //URL-friendly name, such as for git
	nameLowercase: String,
	user: {
		type: ObjectId,
		ref: "User"
	},
	deleted: {
		type: Boolean,
		default: false
	},
	location: String, // git URL
	branch: {
		type: String,
		default: "master"
	},
	script: String,
	docker: {
		image: String,
		command: String,
		links: [{
			app: {
				type: ObjectId,
				ref: 'App'
			},
			name: String
		}]
	}
});

schema.index({
	name: 1,
	user: 1,
	deleted: 1
});

module.exports = mongoose.model("App", schema);