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

.controller('homeController', ['$scope','recipeFactory', 'baseURL', function($scope, recipeFactory, baseURL){
  $scope.baseURL = baseURL;
  $scope.message = "Loading ...";
  $scope.showItem = false;

  recipeFactory.getRecipe().query(
    function(response){
      $scope.recipes = response;
      $scope.showItem = true;
    },
    function(response){
      $scope.message = "Error: "+response.status + " " + response.statusText;
    });

}])

.controller('searchController', ['$scope', 'searchFactory',function($scope, searchFactory){
    $scope.message = "Loading ...";
    // $scope.queryURL = "http://192.168.0.2:3002/api/v2/search?q="+encodeURIComponent($scope.searchQuery);
    // queryURL = $scope.queryURL;
    // searchFactory.search(queryURL).query(
    //   function(response){
    //     $scope.recipes = response;
    //   }
    // )
    $scope.model = {};
    $scope.model.query = "";

    $scope.search = function() {
      console.log($scope.model.query);
      searchFactory.search($scope.model.query, function(err, response) {
        $scope.recipes = response.recipes;
      });
    }

}])
