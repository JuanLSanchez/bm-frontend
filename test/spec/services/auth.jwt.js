'use strict';

describe('Service: auth.jwt', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var auth.jwt;
  beforeEach(inject(function (_auth.jwt_) {
    auth.jwt = _auth.jwt_;
  }));

  it('should do something', function () {
    expect(!!auth.jwt).toBe(true);
  });

});
