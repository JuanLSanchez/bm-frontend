'use strict';

describe('Controller: BookControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('bmFrontendApp'));

  var BookControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookControllerCtrl = $controller('BookControllerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BookControllerCtrl.awesomeThings.length).toBe(3);
  });
});
