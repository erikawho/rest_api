const angular = require('angular');
const twoResApp = angular.module('twoResApp', []);

twoResourcesApp.controller('moviesController',['$scope', '$http', ($scope, $http) => {
  $scope.movies = [];
  $http.get('http://localhost:3000/api/movies')
    .then((res) => {
      $scope.movies = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createMovie = function(movie) {
    $http.post('http://localhost:3000/api/movies', movie)
      .then((res) => {
        $scope.movies.push(res.data);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateMovie = function (movie){
    $http.put('http://localhost:3000/api/movies/' + movie._id, movie)
      .then((res) => {
        console.log('update');
        $scope.movies[$scope.movies.indexOf(movie)] = movie;
        movie.editing = false;
        console.log(movie.editing);
        console.log($scope.movies);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteMovie = function (movie) {
    $http.delete('http://localhost:3000/api/movies/' + movie._id)
      .then((res) => {
        $scope.movies = $scope.movies.filter((item) => item !== movie);
      }, (err) => {
        console.log(err);
      });
  };
}]);

twoResourcesApp.controller('actorsController', ['$scope', '$http', ($scope, $http) => {
  $scope.actors = [];
  $http.get('http://localhost:3000/api/actors')
    .then((res) => {
      $scope.actors = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createActor = function(actor) {
    $http.post('http://localhost:3000/api/actors', actor)
      .then((res) => {
        $scope.actors.push(res.data);
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateActor = function (actor){
    $http.put('http://localhost:3000/api/actors/' + actor._id, actor)
      .then((res) => {
        console.log('update');
        $scope.actors[$scope.actors.indexOf(actor)] = actor;
        actor.editing = false;

      }, (err) => {
        console.log(err);
      });
  };

  $scope.deleteActor= function (actor) {
    $http.delete('http://localhost:3000/api/actors/' + actor._id)
      .then((res) => {
        $scope.actors = $scope.actors.filter((item) => item !== actor);
      }, (err) => {
        console.log(err);
      });
  };
}]);
