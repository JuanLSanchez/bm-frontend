'use strict';

describe('Directive: operationCreate', function () {

  // load the directive's module
  beforeEach(module('bmFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<operation-create></operation-create>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the operationCreate directive');
  }));
});
