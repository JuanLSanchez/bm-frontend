'use strict';

describe('Service: supplier.service.js', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var supplier.service.js;
  beforeEach(inject(function (_supplier.service.js_) {
    supplier.service.js = _supplier.service.js_;
  }));

  it('should do something', function () {
    expect(!!supplier.service.js).toBe(true);
  });

});
