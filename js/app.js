var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', function($scope){
    $scope.clicked = false;
    $scope.scary = false;

    $scope.isItScary = function () {
      $scope.clicked = true;
      $scope.scary = !$scope.scary;
    };

    //function for checking if something is scary:
    //take user input of movie title
    //find movie title in list of movies
    //return keywords for that movie
    //check if any keywords are a match against the user input of scaryThing (substring search)
    //if yes, return scary=true
    //if no, return scary=false
}]);