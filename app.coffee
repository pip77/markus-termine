express		= require 'express'
stylus 		= require 'stylus'
nib 			= require 'nib'
mongoose 	= require 'mongoose'
moment		= require 'moment'

events = require './controller/events'

app = express()

compile = (str, path) ->
	stylus(str).set('filename', path).use nib()

app.configure ->
	app.set 'port', process.env.PORT or 4000
	# app.set 'storage', process.env.MONGOHQ_URL or 'mongodb://localhost/events'
	app.set 'storage-uri',
		process.env.MONGOHQ_URL or
		'mongodb://events:stneve@ds011765.mlab.com:11765/events' or
		'mongodb://localhost/events'
	app.use express.bodyParser()
	app.use express.methodOverride()

	app.set 'views', __dirname + '/views'
	app.set 'view engine', 'jade'

	app.use express.logger 'dev'
	app.use stylus.middleware(
		src: __dirname + '/public'
		compile: compile)
	app.use express.static(__dirname + '/public')

mongoose.connect app.get('storage-uri'), { db: { safe: true }}, (err) ->
	console.log "Mongoose - connection error: " + err if err?
	console.log "Mongoose - connection OK"

require './model/event'

# -
# Routes
# -

app.get '/', (req, res) ->
	res.render 'index', { title : 'Event finden' }

app.get '/events/:id', (req, res) ->
	Resource = mongoose.model('Event')

	# TODO: Preis

	Resource.findById req.params.id, (err, data) ->
		res.render 'detail', { title : data.name, e: data, moment: moment  }

app.get '/events', (req, res) ->
	Resource = mongoose.model('Event')

	# TODO: Abhängigkeit vom Timeframe, Preis

	Resource.find({ category: { $in: req.query.was } }).sort({date: 1}).exec (err, data) ->
		res.render 'list', { title : 'Ergebnisse deiner Suche', events: data, moment: moment }

app.get '/create', (req, res) ->
	res.render 'create', { title : 'Event erstellen' }

app.post    '/api/events',     events.create
app.get     '/api/events',     events.retrieve
app.get     '/api/events/:id', events.retrieve
app.put     '/api/events/:id', events.update
app.delete  '/api/events/:id', events.delete

app.listen app.get('port'), ->
	console.log "Listening on port #{app.get('port')}"