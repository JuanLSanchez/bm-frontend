'use strict';

describe('Controller: NavbarControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var NavbarControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarControllerCtrl = $controller('NavbarControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NavbarControllerCtrl.awesomeThings.length).toBe(3);
  });
});
