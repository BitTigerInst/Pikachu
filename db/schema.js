var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    reqired: true
  },
  recipes: [{
    type: String
  }]
});

// http://schema.org/Recipe
var recipeSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    reqired: true
  },
  image: {
    type: String
  },
  rating: {
    type: Number
  },
  cooked: {
    type: Number
  },
  dishes: {
    type: Number
  },
  likes: {
    type: Number
  },
  comments: {
    type: Number
  },
  dateCreated: {
    type: String
  },
  ingredients: [{
    type: String
  }],
  categories: [{
    type: String
  }]
});

module.exports.categorySchema = categorySchema;
module.exports.recipeSchema = recipeSchema;
