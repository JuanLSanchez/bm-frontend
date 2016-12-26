'use strict';

describe('Service: supplier.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var supplier.service;
  beforeEach(inject(function (_supplier.service_) {
    supplier.service = _supplier.service_;
  }));

  it('should do something', function () {
    expect(!!supplier.service).toBe(true);
  });

});
