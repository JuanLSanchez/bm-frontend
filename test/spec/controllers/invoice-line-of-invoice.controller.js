'use strict';

describe('Controller: InvoiceLineOfInvoiceControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var InvoiceLineOfInvoiceControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvoiceLineOfInvoiceControllerCtrl = $controller('InvoiceLineOfInvoiceControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InvoiceLineOfInvoiceControllerCtrl.awesomeThings.length).toBe(3);
  });
});
