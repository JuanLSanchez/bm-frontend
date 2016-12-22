'use strict';

describe('Controller: OperationCreateControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var OperationCreateControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OperationCreateControllerCtrl = $controller('OperationCreateControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OperationCreateControllerCtrl.awesomeThings.length).toBe(3);
  });
});
