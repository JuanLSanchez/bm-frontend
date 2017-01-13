'use strict';

describe('Service: statistics.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var statistics.service;
  beforeEach(inject(function (_statistics.service_) {
    statistics.service = _statistics.service_;
  }));

  it('should do something', function () {
    expect(!!statistics.service).toBe(true);
  });

});
