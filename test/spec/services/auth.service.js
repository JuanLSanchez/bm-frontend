'use strict';

describe('Service: auth.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var auth.service;
  beforeEach(inject(function (_auth.service_) {
    auth.service = _auth.service_;
  }));

  it('should do something', function () {
    expect(!!auth.service).toBe(true);
  });

});
