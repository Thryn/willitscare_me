var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$http', function($scope, $http){
    $scope.clicked = false;
    $scope.scary = false;
    $scope.notFound = false;
    $scope.scaryThing = '';
    $scope.requestedMovie = '';
    
    $scope.lookUpMovie = function () {
        $scope.clicked = true;
        var query = {
          query: {
            bool: {
              must: $scope.requestedMovie.split(/\s+/).map(function (word) { return {term: {title: word.toLowerCase()}}; })
            }
          }
        };
        var searchPath = "http://localhost:9200/movies/movies/_search";
        $http.post(searchPath, query).
          success(function(data, status, headers, config) {
            if (data.hits.hits.length > 0) {
              $scope.notFound = false;
              var re = new RegExp($scope.scaryThing, "gi");
              $scope.scary = data.hits.hits[0]._source.keywords.some(function (keyword) {
                  return keyword.search(re) != -1;
                }
              );
              $scope.returnedMovie = data.hits.hits[0]._source.title;
              $scope.returnedKeyword = $scope.scaryThing + "s";
            } else {
              $scope.notFound = true;              
            }
          }).
          error(function(data, status, headers, config) {
            // no-op
          }).finally(function () {
            // $scope.scaryThing = '';
            // $scope.requestedMovie = '';
          });
    }
}]);

//clear form after query
//fix: false positive if no keyword is selected
