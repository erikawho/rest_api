// 'use strict';

require(__dirname + '/../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('dog controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('wapApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var dogController = $ControllerConstructor('dogController', { $scope });
    expect(typeof dogController).toBe('object');
    expect(Array.isArray($scope.dog)).toBe(true);
    expect(typeof $scope.alldogs).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('dogController', { $scope });
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/dog', () => {
      $httpBackend.expectGET('http://localhost:3000/api/alldogs').respond(200, [{ name: 'test dog' }]);
      $scope.alldogs();
      $httpBackend.flush();
      expect($scope.dog.length).toBe(1);
      expect($scope.dog[0].name).toBe('test dog');
    });

    it('should create a new dog', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/dog', { name: 'the sent dog' }).respond(200, { name: 'the response dog' });
      $scope.newDog = { name: 'the new dog' };
      $scope.createDog({ name: 'the sent dog' });
      $httpBackend.flush();
      expect($scope.dog.length).toBe(1);
      expect($scope.newDog).toBe(null);
      expect($scope.dog[0].name).toBe('the response dog');
    });

    it('should update a dog', () => {
      var testDog = { name: 'inside scope', editing: true, _id: 5 };
      $scope.dog.push(testDog);
      $httpBackend.expectPUT('http://localhost:3000/api/dog5', testDog).respond(200);
      $scope.updateDog(testDog);
      $httpBackend.flush();
      expect(testDog.editing).toBe(false);
      expect($scope.dog[0].editing).toBe(false);
    });

    it('should delete a dog', () => {
      var testDog = {name: 'goodbye dog', _id: 1};
      $scope.dog.push(testDog);
      expect($scope.dog.indexOf(testDog)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/dog1').respond(200);
      $scope.deleteDog(testDog);
      $httpBackend.flush();
      expect($scope.dog.indexOf(testDog)).toBe(-1);
    });
  });
});
