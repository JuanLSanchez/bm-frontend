'use strict';

describe('Directive: selectCreateSupplier.directive', function () {

  // load the directive's module
  beforeEach(module('bmFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<select-create-supplier.directive></select-create-supplier.directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the selectCreateSupplier.directive directive');
  }));
});
