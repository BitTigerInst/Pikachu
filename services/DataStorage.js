var MongoDBClient = require('./MongoDBClient');
var models = require('../db/models');

var Recipe = models.Recipe;
var Category = models.Category;

exports.saveRecipe = function saveRecipe(recipe) {
  // create new recipe
  var newRecipe = new Recipe({
    _id: "recipe:" + recipe.id,
    name: recipe.name,
    rating: recipe.rating,
    cooked: recipe.cooked,
    dishes: recipe.dishes,
    ingredients: recipe.ingredients,
    categories: recipe.categories
  });

  newRecipe.save(function (err) {
    if (err) {
      console.log('save recipe doc failed: ' + err.message);

      var id = "recipe:" + recipe.id;
      delete recipe.id;
      Recipe.findByIdAndUpdate(id, recipe, {upsert: true}, function(err, doc){
        if (err) {
          console.log('update recipe doc failed: ' + err);
        } else {
          console.log("succesfully updated");
        }
      });
    }
  });


}

exports.saveCategory = function saveCategory(category) {
  var newCategory = new Category({
    _id: "category:" + category.id,
    name: category.name,
    recipes: category.recipes
  });

  newCategory.save(function (err) {
    if (err) {
      console.log('save category doc failed: ' + err.message);
      var id = "category:" + category.id;
      delete category.id;
      Category.findByIdAndUpdate(id, category, {upsert: true}, function(err, doc){
        if (err) {
          console.log('update category doc failed: ' + err);
        } else {
          console.log("succesfully updated");
        }
      });
    }
  });
}
