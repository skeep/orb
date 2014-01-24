angular.module('orbApp').controller('MainCtrl', function ($scope, $location) {

  'use strict';

  $scope.path = '';

  $scope.openProject = function () {

    var id = Math.random().toString(36).slice(2);

    localStorage[id] = $scope.path;

    $location.path('/designer/' + id);

  };

});
