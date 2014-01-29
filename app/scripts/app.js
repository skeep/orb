'use strict';

angular.module('orbApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/designer', {
        templateUrl: 'views/designer.html',
        controller: 'DesignerCtrl'
      })
      .otherwise({
        redirectTo: '/designer'
      });
  });
