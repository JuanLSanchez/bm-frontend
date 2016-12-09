'use strict';

describe('Service: account.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var account.service;
  beforeEach(inject(function (_account.service_) {
    account.service = _account.service_;
  }));

  it('should do something', function () {
    expect(!!account.service).toBe(true);
  });

});
