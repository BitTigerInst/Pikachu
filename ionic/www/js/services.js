'use strict';

angular.module('starter.services', ['ngResource'])
        .constant("baseURL","http://192.168.0.2:3002/api/")
        //http://localhost:3000/
        //http://192.168.0.2:3002/api/

        .service('recipeFactory', ['$resource', 'baseURL',function($resource,baseURL) {
                this.getRecipe = function(){
                    //return $resource(baseURL+"recipe/:id",null,  {'update':{method:'PUT' }});
                    return $resource(baseURL+"v1/recipe/:id", null, {'update':{method:'PUT' }});
                };
        }])

        // .service('searchFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        //       //  this.search = function(query){
        //       //     return $resource(query);
        //       //  };
        //       console.log("searchFactory Triggered");
        //       console.log("baseURL: " + baseURL);
        //       this.search = function(query){
        //          return $resource(baseURL + "v2/search/?q=" + encodeURIComponent(query), null, {'get': {method: 'GET'}});
        //       };
        //     }])
        .factory('searchFactory', ['$resource', 'baseURL', function($resource, baseURL) {
              //  this.search = function(query){
              //     return $resource(query);
              //  };
              var searchRecipe = $resource(baseURL + "v2/search/", null, {'get': {method: 'GET'}});
              console.log("searchFactory Triggered");
              console.log("baseURL: " + baseURL);

              return { search: function(query, callback) {
                searchRecipe.get({q: query}, function(response) {
                  return callback(null, response);
                }, function(err) {
                  return callback(err, null);
                });
              }
            };
            }])

        .factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            var favFac = {};
            var favorites = []; // save IDs

            favFac.addToFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index)
                        return;
                }
                favorites.push({id: index});
            };

            favFac.deleteFromFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index) {
                        favorites.splice(i, 1);
                    }
                }
            };

            favFac.getFavorites = function () {
                return favorites;
            };

            return favFac;
        }])


;
