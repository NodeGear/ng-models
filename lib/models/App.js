var models = require('../ng-models')

var mongoose = models.mongoose
	, ObjectId = mongoose.Schema.ObjectId
	, Usage = require('./Usage')
	, async = require('async')
	, ansi2html = new (require('ansi-to-html'))
	, fs = require('fs')

var schema = mongoose.Schema({
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
	script: String
})

module.exports = mongoose.model("App", schema);