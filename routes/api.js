var express = require('express');
var router = express.Router();
var QueryService = require('../services/QueryService');
var SearchService = require('../services/SearchService');

/* GET loading page recipes v1. */
router.get('/v1/recipe/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var response = {};

  if (true) {
    QueryService.getDefaultRecipes(function(err, docs) {
      if (err) {
        response.error = "Search failed";
        console.log(err.message);
      } else {
        response = docs;
      }
      res.send(response);
    });
  } else {
    res.send({status: "OK"});
  }
});

/* GET recipes v1. MongoDB query by ingredients */
router.get('/v1/recipe/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var response = {};

  if (req.params.id) {
    var id = req.params.id;

    console.log("Recipe id: " + id);

    QueryService.getRecipe(id, function(err, doc) {
      if (err) {
        response.error = "Search failed";
        console.log(err.message);
      } else {
        response = doc;
      }
      res.send(response);
    });
  } else {
    console.log(req.params.q);
    res.send({status: "OK"});
  }
});


/* GET search recipes v1. */
router.get('/v1/search', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var response = {};

  // URL parameter /v1/search?q=
  if (req.query.q) {
    var q = req.query.q;

    console.log("Search term: " + q);

    QueryService.searchRecipe(q, function(err, docs) {
      if (err) {
        response.error = "Search failed";
        console.log(err.message);
      } else {
        response.docs = docs;
        response.length = docs.length;
      }
      res.send(response);
    });
  } else {
    console.log(req.query.q);
    res.send({status: "OK"});
  }
});

/* GET search recipes v2. ElasticSearch by full text search names */
router.get('/v2/search', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var response = {};

  // URL parameter /v2/search?q=
  if (req.query.q) {
    var q = req.query.q;

    console.log("Search term: " + q);

    SearchService.searchRecipe(q, function(err, docs) {
      if (err) {
        response.error = "Search failed";
        console.log(err.message);
      } else {
        response.recipes = docs;
        response.length = docs.length;
      }
      res.send(response);
    });
  } else {
    console.log(req.query.q);
    res.send({status: "OK"});
  }
});

module.exports = router;
