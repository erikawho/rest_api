'use strict';

const angular = require('angular');

const wapApp = angular.module('wapApp', []);

wapApp.controller('dogController', ['$scope', '$http', function($scope, $http) {
  $scope.dog = [];

$scope.alldogs = () => {
  $http.get('http://localhost:3000/api/alldogs')
    .then((res) => {
      console.log('success getting all dogs!');
      $scope.dog = res.data;
    }, (err) => {
      console.log(err);
    });
  };

  $scope.createDog = (dog) => {
    $http.post('http://localhost:3000/api/dog', dog)
      .then((res) => {
        console.log('success creating dog!');
        $scope.dog.push(res.data);
        $scope.newDog = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateDog = (dog) => {
    $http.put('http://localhost:3000/api/dog' + dog._id, dog)
      .then((res) => {
        console.log('success updating dog!');
        $scope.dog[$scope.dog.indexOf(dog)] = dog;
        dog.editing = false;
      }, (err) => {
        console.log(err);
        dog.editing = false;
      });
  };

  $scope.deleteDog = (dog) => {
    $http.delete('http://localhost:3000/api/dog' + dog._id)
      .then((res) => {
        console.log('success deleting dog!');
        $scope.dog = $scope.dog.filter((i) => i !== dog);
      }, (err) => {
        console.log(err);
      });
  };
}]);

wapApp.controller('humanController', ['$scope', '$http', function($scope, $http) {
  $scope.human = [];

  $scope.allhumans = () => {
    $http.get('http://localhost:3000/api/allhumans')
      .then((res) => {
        console.log('success getting all humans!');
        $scope.human = res.data;
      }, (err) => {
        console.log(err);
      });
    };

  $scope.createHuman = (human) => {
    $http.post('http://localhost:3000/api/human', human)
      .then((res) => {
        console.log('success creating human!');
        $scope.human.push(res.data);
        $scope.newHuman = null;
      }, (err) => {
        console.log(err);
      });
  };

  $scope.updateHuman = (human) => {
    $http.put('http://localhost:3000/api/human' + human._id, human)
      .then((res) => {
        console.log('success updating human!');
        $scope.human[$scope.human.indexOf(human)] = human;
        human.editing = false;
      }, (err) => {
        console.log(err);
        human.editing = false;
      });
  };

  $scope.deleteHuman = (human) => {
    $http.delete('http://localhost:3000/api/human' + human._id)
      .then((res) => {
        console.log('success deleting human!');
        $scope.human = $scope.human.filter((i) => i !== human);
      }, (err) => {
        console.log(err);
      });
  };
}]);
