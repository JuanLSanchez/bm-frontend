'use strict';

describe('Service: parse.links', function () {

  // load the service's module
  beforeEach(module('bmFrontendApp'));

  // instantiate service
  var parse.links;
  beforeEach(inject(function (_parse.links_) {
    parse.links = _parse.links_;
  }));

  it('should do something', function () {
    expect(!!parse.links).toBe(true);
  });

});
