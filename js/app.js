var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$http', function($scope, $http){
    $scope.clicked = false;
    $scope.scary = false;
    $scope.notFound = false;
    $scope.scaryThing = '';
    $scope.requestedMovie = '';

    $scope.isItScary = function () {
      $scope.clicked = true;
      // $scope.scary = !$scope.scary;
    };
    
    $scope.lookUpMovie = function () {
        $scope.clicked = true;
        $scope.moviePath = ["output", $scope.requestedMovie.substring(0,2), $scope.requestedMovie.substring(2,4), $scope.requestedMovie + ".json"].join('/');
        console.log($scope.moviePath);
        $http.get($scope.moviePath).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.notFound = false;
            $scope.scary = data.keywords.indexOf($scope.scaryThing) !== -1;
            console.log($scope.scaryThing);
            console.log(data);

          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.error(data);
            $scope.notFound = true;
          }).finally(function () {
              // $scope.scaryThing = '';
              // $scope.requestedMovie = '';
          });

    }

    // $scope.lookUpMoviehttp()


//function for checking if something is scary:
    $scope.willItScareMe = function(movie) {
    //look up movie from user input
        //if movie not found
            //return not found message
        //if movie found
            //return keywords for that movie
            //check if any keywords are a match against the user input of scaryThing (substring search)
                //if yes 
                    //return scary=true
                    //update ui
                //if no 
                    //return scary=false
                    //update ui
        //clear input field
    }
    
}]);

//clear form after query
//search for substring of keyword
//take year out of movies (search for substring?)
//make scary things able to be capitalized
