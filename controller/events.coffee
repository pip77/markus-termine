mongoose = require 'mongoose'

exports.create = (req, res) ->
	console.log "create"
	Resource = mongoose.model('Event')
	fields = req.body
	console.log "fields: ", fields

	r = new Resource(fields)
	r.save (err, resource) ->
		console.log resource
		res.send(500, { error: err }) if err?
		res.send(resource)
		

exports.retrieve = (req, res) ->
	console.log "retrieve"
	Resource = mongoose.model('Event')

	if req.params.id?
		Resource.findById req.params.id, (err, resource) ->
			res.send(500, { error: err }) if err?
			res.send(resource) if resource?
			res.send(404)
	else
		Resource.find({}).sort({date: 'desc'}).exec((err, coll) ->
			res.send(coll))


exports.update = (req, res) ->
	Resource = mongoose.model('Event')
	fields = req.body

	Resource.findByIdAndUpdate req.params.id, { $set: fields }, (err, resource) ->
		res.send(500, { error: err }) if err?
		res.send(resource) if resource?
		res.send(404)


exports.delete = (req, res) ->
	Resource = mongoose.model('Event')

	Resource.findByIdAndRemove req.params.id, (err, resource) ->
		res.send(500, { error: err }) if err?
		res.send(200) if resource?
		res.send(404)