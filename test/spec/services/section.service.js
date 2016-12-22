'use strict';

describe('Service: section.service', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var section.service;
  beforeEach(inject(function (_section.service_) {
    section.service = _section.service_;
  }));

  it('should do something', function () {
    expect(!!section.service).toBe(true);
  });

});
