'use strict';

describe('Directive: supplierCreate', function () {

  // load the directive's module
  beforeEach(module('bmFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<supplier-create></supplier-create>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the supplierCreate directive');
  }));
});
