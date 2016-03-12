var mongoose = require('mongoose');
var MongoDBClient = require("../services/MongoDBClient");
var schema = require('./schema');

var models = {};

MongoDBClient.getInstance(function(err, client) {
  if (err) {
    console.log("failed to connect to MongoDB, model initialization failed");
  } else {
    console.log("connected to MongoDB, model initialization succeeded");
  }
});

var Category = mongoose.model('Category', schema.categorySchema);
var Recipe = mongoose.model('Recipe', schema.recipeSchema);

models.Category = Category;
models.Recipe = Recipe;

module.exports = models;
