angular.module('orbApp').controller('MainCtrl', function ($scope, Screens) {
  'use strict';

  $scope.screens = Screens.list();
  $scope.screenMetaData = Screens.get.meta();
  $scope.linkMaps = {};
  $scope.selectedLinks = [];
  $scope.selectedId = '';
  $scope.links = [];
  $scope.selectedFileName = '';
  $scope.landingScreen = $scope.screens[0];


  var getLinkMaps = function () {
    $scope.linkMaps = Screens.get.linkMaps($scope.selectedId);
  };

  var getLinks = function (selectedId) {
    if ($scope.selectedId !== '') {
      return Screens.get.links(selectedId);
    } else {
      return [];
    }
  };

  $scope.loadScreen = function () {
    $scope.selectedFileName = Screens.get.fileName($scope.selectedId);
    getLinkMaps();
  };

  $scope.showLinkCheckbox = function (screenId) {
    if ($scope.selectedId === '') {
      return false;
    } else if (screenId !== $scope.selectedId) {
      return true;
    } else {
      return false;
    }
  };

  $scope.linksCount = function (screen) {
    return _.values(screen.links).length;
  };

  $scope.$watch('linkMaps', function (n) {
    if (!_.isEmpty($scope.selectedId)) {
      Screens.put.links($scope.selectedId, n);
    }
  }, true);

  $scope.$watch('selectedId', function (n) {
    $scope.links = getLinks(n);
  });

  $scope.$watch('screenMetaData.absPath', function (n) {
    Screens.put.path(n);
  });

  $scope.$watch('landingScreen', function (screen) {
    Screens.put.landingScreen(screen.id);
  });

});
