'use strict';

angular.module('orbApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/designer/:designId', {
        templateUrl: 'views/designer.html',
        controller: 'DesignerCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
