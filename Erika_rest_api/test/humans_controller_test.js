'use strict';

require(__dirname + '/../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('human controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('wapApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var humanController = $ControllerConstructor('humanController', { $scope });
    expect(typeof humanController).toBe('object');
    expect(Array.isArray($scope.human)).toBe(true);
    expect(typeof $scope.allhumans).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('humanController', { $scope });
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/human', () => {
      $httpBackend.expectGET('http://localhost:3000/api/allhumans').respond(200, [{ name: 'test human' }]);
      $scope.allhumans();
      $httpBackend.flush();
      expect($scope.human.length).toBe(1);
      expect($scope.human[0].name).toBe('test human');
    });

    it('should create a new human', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/human', { name: 'the sent human' }).respond(200, { name: 'the response human' });
      $scope.newHuman = { name: 'the new human' };
      $scope.createHuman({ name: 'the sent human' });
      $httpBackend.flush();
      expect($scope.human.length).toBe(1);
      expect($scope.newHuman).toBe(null);
      expect($scope.human[0].name).toBe('the response human');
    });

    it('should update a human', () => {
      var testHuman = { name: 'inside scope', editing: true, _id: 5};
      $scope.human.push(testHuman);
      $httpBackend.expectPUT('http://localhost:3000/api/human5', testHuman).respond(200);
      $scope.updateHuman(testHuman);
      $httpBackend.flush();
      expect(testHuman.editing).toBe(false);
      expect($scope.human[0].editing).toBe(false);
    });

    it('should delete a human', () => {
      var testHuman = { name: 'goodbye human', _id: 1 };
      $scope.human.push(testHuman);
      expect($scope.human.indexOf(testHuman)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/human1').respond(200);
      $scope.deleteHuman(testHuman);
      $httpBackend.flush();
      expect($scope.human.indexOf(testHuman)).toBe(-1);
    });
  });
});
