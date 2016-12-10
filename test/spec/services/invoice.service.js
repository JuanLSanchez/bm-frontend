'use strict';

describe('Service: invoice.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var invoice.service;
  beforeEach(inject(function (_invoice.service_) {
    invoice.service = _invoice.service_;
  }));

  it('should do something', function () {
    expect(!!invoice.service).toBe(true);
  });

});
