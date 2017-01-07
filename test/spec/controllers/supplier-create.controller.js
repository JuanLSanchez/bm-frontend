'use strict';

describe('Controller: SupplierCreateControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var SupplierCreateControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupplierCreateControllerCtrl = $controller('SupplierCreateControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SupplierCreateControllerCtrl.awesomeThings.length).toBe(3);
  });
});
