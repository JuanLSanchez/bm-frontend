'use strict';

describe('Controller: SelectCreateSupplierControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var SelectCreateSupplierControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectCreateSupplierControllerCtrl = $controller('SelectCreateSupplierControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SelectCreateSupplierControllerCtrl.awesomeThings.length).toBe(3);
  });
});
