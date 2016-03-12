var cheerio = require('cheerio');
var fs = require('fs');
var DataStorage = require('../services/DataStorage');

var xcfParser = function(queueItem, responseBuffer) {
  var $ = cheerio.load(responseBuffer);

  if (queueItem.url.match(/(\/category\/)/i)) {
    try {
      var category = {};

      category.id = queueItem.url.match(/\/category\/([0-9]*)/i)[1];
      category.name = $(".page-title").text().trim();
      category.recipes = [];

      $(".recipe-140-horizontal").find(".info")
      .find(".name").find("a").each(function(i, element) {
        category.recipes.push(
          element.attribs['href'].match(/\/recipe\/([0-9]*)/i)[1]
        );
      });
      console.log(category);

      // Save to MongoDB
      DataStorage.saveCategory(category);

      var categoryJSON = JSON.stringify(category) + "\n";

      fs.appendFile('./data/category.txt', categoryJSON, function(err) {
        if (err) {
          console.log(err);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Fetch Recipe data
  // Exclude create_dish, dishes, answers, menu, comments, questions
  if (queueItem.url.match(/(\/recipe\/)/i) &&
    !queueItem.url.match(/(\/dishes\/)/i) &&
    !queueItem.url.match(/(\/create_dish\/)/i) &&
    !queueItem.url.match(/(\/answers\/)/i) &&
    !queueItem.url.match(/(\/questions\/)/i) &&
    !queueItem.url.match(/(\/menu\/)/i) &&
    !queueItem.url.match(/(\/comments\/)/i)
  ) {
    try {
      var recipe = {};

      recipe.id = queueItem.url.match(/\/recipe\/([0-9]*)/i)[1];
      console.log("recipe.id " + recipe.id);
      recipe.name = $(".page-title").text().trim();
      console.log("recipe.name: " + recipe.name);
      recipe.rating = parseFloat($(".score").find(".number").text());
      console.log("recipe.rating: " + recipe.rating);
      // Handle NaN issue
      if (String(recipe.rating) === "NaN") {
        recipe.rating = 0;
      }
      recipe.cooked = parseInt($(".cooked").find(".number").text());
      console.log("recipe.cooked " + recipe.cooked);
      recipe.dishes = parseInt($(".recipe-dishes-title").find(".num").text());
      console.log("recipe.dishes " + recipe.dishes);
      recipe.image = $('.image').find("img").attr("src").split("?")[0];
      console.log("recipe.image " + recipe.image);

      recipe.likes = 0;
      recipe.comments = 0;
      recipe.dateCreated = $("meta[itemprop=dateCreated]").attr("content");

      $("meta[itemprop=interactionCount]").each(function(i, e) {
        if (e.attribs.content.startsWith("UserLikes")) {
          recipe.likes = Number(e.attribs.content.split(':')[1]);
          console.log("recipe.likes " + recipe.likes);
        }
        if (e.attribs.content.startsWith("UserComments")) {
          recipe.comments = Number(e.attribs.content.split(':')[1]);
          console.log("recipe.comments: " + recipe.comments);
        }
      });

      recipe.ingredients = [];
      $(".ings").find("tr").find(".name").each(function(i, e) {
        recipe.ingredients.push($(this).text().trim());
      });
      console.log("recipe.ingredients: " + recipe.ingredients);

      recipe.categories = [];
      $(".recipe-cats").find("a").each(function(i, e) {
        recipe.categories.push(
          e.attribs.href.match(/\/category\/([0-9]*)/i)[1]
        );
      });

      console.log("recipe.categories: " + recipe.categories);

      console.log(recipe);

      // Save to MongoDB
      DataStorage.saveRecipe(recipe);

      // Save to file
      var recipeJSON = JSON.stringify(recipe) + "\n";

      fs.appendFile('./data/recipe.txt', recipeJSON, function(err) {
        if (err) {
          console.log(err);
        }
      });

    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = xcfParser;
