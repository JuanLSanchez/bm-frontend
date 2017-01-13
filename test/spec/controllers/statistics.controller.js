'use strict';

describe('Controller: StatisticsControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var StatisticsControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatisticsControllerCtrl = $controller('StatisticsControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StatisticsControllerCtrl.awesomeThings.length).toBe(3);
  });
});
