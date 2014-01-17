'use strict';

describe('Service: Screens', function () {

  // load the service's module
  beforeEach(module('orbApp'));

  // instantiate service
  var Screens;
  beforeEach(inject(function (_Screens_) {
    Screens = _Screens_;
  }));

  it('should do something', function () {
    expect(!!Screens).toBe(true);
  });

});
