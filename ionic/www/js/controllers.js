angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('homeController', ['$scope','recipeFactory', 'favoriteFactory','baseURL', '$ionicListDelegate','$ionicModal', function($scope, recipeFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicModal){
  $scope.baseURL = baseURL;
  $scope.message = "Loading ...";
  $scope.showItem = false;

  recipeFactory.getRecipe().query(
    function(response){
      console.log(response);
      $scope.recipes = response;
      $scope.showItem = true;
    },
    function(response){
      $scope.message = "Error: "+response.status + " " + response.statusText;
    });

    $scope.addFavorite = function (index) {
      console.log("index is " + index);
      favoriteFactory.addToFavorites(index);
      $ionicListDelegate.closeOptionButtons();
    };

}])

.controller('searchController', ['$scope', 'searchFactory', 'favoriteFactory', '$ionicListDelegate', function($scope, searchFactory, favoriteFactory, $ionicListDelegate){
    $scope.message = "Loading ...";
    $scope.model = {};
    $scope.model.query = "";

    $scope.search = function() {
      console.log($scope.model.query);
      searchFactory.search($scope.model.query, function(err, response) {
        $scope.recipes = response.recipes;
      });
    };

    $scope.addFavorite = function (index) {
      console.log("index is " + index);
      favoriteFactory.addToFavorites(index);
      $ionicListDelegate.closeOptionButtons();
    };

}])

.controller('FavoritesController', ['$scope', 'recipeFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, recipeFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading...'
    });

    $scope.favorites = favoriteFactory.getFavorites();
    console.log("favorites: ", $scope.favorites.length);

    $scope.recipes = recipeFactory.getRecipe().query(
        function (response) {
            $scope.recipes = response;
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);
        });

    console.log($scope.recipes, $scope.favorites);

    $scope.toggleDelete = function () {
    $scope.shouldShowDelete = !$scope.shouldShowDelete;
    console.log($scope.shouldShowDelete);
};

$scope.deleteFavorite = function (index) {

    var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm Delete',
        template: 'Are you sure you want to delete this item?'
    });

    confirmPopup.then(function (res) {
        if (res) {
            console.log('Ok to delete');
            favoriteFactory.deleteFromFavorites(parseInt(index));
        } else {
            console.log('Canceled delete');
        }
    });

    $scope.shouldShowDelete = false;

};
}])

.filter('favoriteFilter', function () {
    return function (recipes, favorites) { // The first par dishes is the array on which will be done the filtering. The second par favorites is the par that you supply the filter.
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < recipes.length; j++) {
                if (String(recipes[j].id) === String(favorites[i].id))
                    out.push(recipes[j]);
            }
        }
        return out;

    }})

;
