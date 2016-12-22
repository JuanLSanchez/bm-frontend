'use strict';

describe('Service: operation.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var operation.service;
  beforeEach(inject(function (_operation.service_) {
    operation.service = _operation.service_;
  }));

  it('should do something', function () {
    expect(!!operation.service).toBe(true);
  });

});
