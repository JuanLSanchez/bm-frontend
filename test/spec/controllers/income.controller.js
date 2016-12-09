'use strict';

describe('Controller: IncomeControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var IncomeControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IncomeControllerCtrl = $controller('IncomeControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IncomeControllerCtrl.awesomeThings.length).toBe(3);
  });
});
