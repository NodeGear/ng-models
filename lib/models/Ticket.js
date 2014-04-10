var models = require('../ng-models')

var mongoose = models.mongoose
	, schema = mongoose.Schema
	, ObjectId = schema.ObjectId
	
var s = schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: ObjectId,
		ref: 'User',
		required: true
	},
	app: {
		type: ObjectId,
		ref: 'App'
	},
	subject: String,
	message: String,
	urgent: {
		type: Boolean,
		default: false
	},
	closed: {
		type: Boolean,
		default: false
	},
	messages: [{
		created: {
			type: Date,
			default: Date.now
		},
		user: {
			type: ObjectId,
			ref: 'User'
		},
		message: String
	}]
})

module.exports = mongoose.model("Ticket", s);