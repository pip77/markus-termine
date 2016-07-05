// Generated by CoffeeScript 1.10.0
var mongoose;

mongoose = require('mongoose');

exports.create = function(req, res) {
  var Resource, fields, r;
  console.log("create");
  Resource = mongoose.model('Event');
  fields = req.body;
  console.log("fields: ", fields);
  r = new Resource(fields);
  return r.save(function(err, resource) {
    console.log(resource);
    if (err != null) {
      res.send(500, {
        error: err
      });
    }
    return res.send(resource);
  });
};

exports.retrieve = function(req, res) {
  var Resource;
  console.log("retrieve");
  Resource = mongoose.model('Event');
  if (req.params.id != null) {
    return Resource.findById(req.params.id, function(err, resource) {
      if (err != null) {
        res.send(500, {
          error: err
        });
      }
      if (resource != null) {
        res.send(resource);
      }
      return res.send(404);
    });
  } else {
    return Resource.find({}).sort({
      date: 'desc'
    }).exec(function(err, coll) {
      return res.send(coll);
    });
  }
};

exports.update = function(req, res) {
  var Resource, fields;
  Resource = mongoose.model('Event');
  fields = req.body;
  return Resource.findByIdAndUpdate(req.params.id, {
    $set: fields
  }, function(err, resource) {
    if (err != null) {
      res.send(500, {
        error: err
      });
    }
    if (resource != null) {
      res.send(resource);
    }
    return res.send(404);
  });
};

exports["delete"] = function(req, res) {
  var Resource;
  Resource = mongoose.model('Event');
  return Resource.findByIdAndRemove(req.params.id, function(err, resource) {
    if (err != null) {
      res.send(500, {
        error: err
      });
    }
    if (resource != null) {
      res.send(200);
    }
    return res.send(404);
  });
};
