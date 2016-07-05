// Generated by CoffeeScript 1.10.0
var app, compile, events, express, moment, mongoose, nib, stylus;

express = require('express');

stylus = require('stylus');

nib = require('nib');

mongoose = require('mongoose');

moment = require('moment');

events = require('./controller/events');

app = express();

compile = function(str, path) {
  return stylus(str).set('filename', path).use(nib());
};

app.configure(function() {
  app.set('port', process.env.PORT || 4000);
  app.set('storage-uri', process.env.MONGOHQ_URL || 'mongodb://events:stneve@ds011765.mlab.com:11765/events' || 'mongodb://localhost/events');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));
  return app.use(express["static"](__dirname + '/public'));
});

mongoose.connect(app.get('storage-uri'), {
  db: {
    safe: true
  }
}, function(err) {
  if (err != null) {
    console.log("Mongoose - connection error: " + err);
  }
  return console.log("Mongoose - connection OK");
});

require('./model/event');

app.get('/', function(req, res) {
  return res.render('index', {
    title: 'Event finden'
  });
});

app.get('/events/:id', function(req, res) {
  var Resource;
  Resource = mongoose.model('Event');
  return Resource.findById(req.params.id, function(err, data) {
    return res.render('detail', {
      title: data.name,
      e: data,
      moment: moment
    });
  });
});

app.get('/events', function(req, res) {
  var Resource;
  Resource = mongoose.model('Event');
  return Resource.find({
    category: {
      $in: req.query.was
    }
  }).sort({
    date: 1
  }).exec(function(err, data) {
    return res.render('list', {
      title: 'Ergebnisse deiner Suche',
      events: data,
      moment: moment
    });
  });
});

app.get('/create', function(req, res) {
  return res.render('create', {
    title: 'Event erstellen'
  });
});

app.post('/api/events', events.create);

app.get('/api/events', events.retrieve);

app.get('/api/events/:id', events.retrieve);

app.put('/api/events/:id', events.update);

app["delete"]('/api/events/:id', events["delete"]);

app.listen(app.get('port'), function() {
  return console.log("Listening on port " + (app.get('port')));
});
