'use strict';

describe('Controller: SupplierControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var SupplierControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupplierControllerCtrl = $controller('SupplierControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SupplierControllerCtrl.awesomeThings.length).toBe(3);
  });
});
