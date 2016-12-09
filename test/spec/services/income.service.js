'use strict';

describe('Service: income.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var income.service;
  beforeEach(inject(function (_income.service_) {
    income.service = _income.service_;
  }));

  it('should do something', function () {
    expect(!!income.service).toBe(true);
  });

});
