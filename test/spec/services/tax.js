'use strict';

describe('Service: tax', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var tax;
  beforeEach(inject(function (_tax_) {
    tax = _tax_;
  }));

  it('should do something', function () {
    expect(!!tax).toBe(true);
  });

});
