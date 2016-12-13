'use strict';

describe('Controller: InvoiceCreateControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var InvoiceCreateControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvoiceCreateControllerCtrl = $controller('InvoiceCreateControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InvoiceCreateControllerCtrl.awesomeThings.length).toBe(3);
  });
});
