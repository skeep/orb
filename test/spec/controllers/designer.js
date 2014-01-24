'use strict';

describe('Controller: DesignerCtrl', function () {

  // load the controller's module
  beforeEach(module('orbApp'));

  var DesignerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DesignerCtrl = $controller('DesignerCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
