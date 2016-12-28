'use strict';

describe('Service: invoiceLine.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var invoiceLine.service;
  beforeEach(inject(function (_invoiceLine.service_) {
    invoiceLine.service = _invoiceLine.service_;
  }));

  it('should do something', function () {
    expect(!!invoiceLine.service).toBe(true);
  });

});
