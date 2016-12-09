'use strict';

describe('Service: principal', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var principal;
  beforeEach(inject(function (_principal_) {
    principal = _principal_;
  }));

  it('should do something', function () {
    expect(!!principal).toBe(true);
  });

});
