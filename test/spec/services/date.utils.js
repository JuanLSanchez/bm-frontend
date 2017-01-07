'use strict';

describe('Service: date.utils', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var date.utils;
  beforeEach(inject(function (_date.utils_) {
    date.utils = _date.utils_;
  }));

  it('should do something', function () {
    expect(!!date.utils).toBe(true);
  });

});
