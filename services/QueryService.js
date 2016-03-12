var models = require('../db/models');

var Recipe = models.Recipe;
var Category = models.Category;

/**
 * Get recipe by recipe id
 * @param  {String}   id       recipe id
 * @param  {Function} callback function(err, doc)
 * @return {[type]}            [description]
 */
function getRecipe(id, callback) {
  Recipe.collection.findOne({
    _id: "recipe:" + id
  }, function(err, doc) {
    if (err) {
      return callback(err, null);
    }
    callback(null, doc);
  });
}

/**
 * Get top liked and rated recipe for default landing page
 * @param  {Function} callback function(err, docs)
 * @return {[type]}            [description]
 */
function getDefaultRecipes(callback) {
  Recipe.collection.find({
    likes: {"$gt": 10000}
  })
  .limit(50)
  .sort({
    likes: -1,
    rating: -1,
    cooked: -1,
    dishes: -1
  })
  .toArray(function(err, docs) {
    if (err) {
      return callback(err, null);
    }
    callback(null, docs);
  });
}

/**
 * Utilize native node mongodb driver method to search term in ingredients
 * @param  {string}   q        search term for recipes
 * @param  {Function} callback function(err, docs)
 * @return {[type]}            [description]
 */
function searchRecipe(q, callback) {
  Recipe.collection.find({
    ingredients: q
  })
  .limit(100)
  .sort({
    likes: -1,
    rating: -1,
    cooked: -1,
    dishes: -1
  })
  .toArray(function(err, docs) {
    if (err) {
      return callback(err, null);
    }
    callback(null, docs);
  });
}

exports.getRecipe = getRecipe;
exports.getDefaultRecipes = getDefaultRecipes;
exports.searchRecipe = searchRecipe;
