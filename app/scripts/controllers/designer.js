angular.module('orbApp').controller('DesignerCtrl', function ($scope, $routeParams, Screens) {
  'use strict';

  $scope.bar = {
    label: 'Hide',
    visible: true
  };

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

  $scope.initProject = function(){

    Screens.init(localStorage[$routeParams.designId]);

    $scope.screens = Screens.list();
    $scope.screenMetaData = Screens.get.meta();
    $scope.landingScreen = $scope.screens[0];

    $scope.linkMaps = {};
    $scope.selectedLinks = [];
    $scope.selectedId = '';
    $scope.links = [];
    $scope.selectedFileName = '';

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

  $scope.removeFocus = function () {
    $scope.selectedId = '';
  };

  $scope.toggleScreens = function () {
    if ($scope.bar.visible) {
      $scope.bar = {
        label: 'Show',
        visible: false
      };
    } else {
      $scope.bar = {
        label: 'Hide',
        visible: true
      };
    }
  };

  $scope.$watch('linkMaps', function (n) {
    if (!_.isEmpty($scope.selectedId)) {
      Screens.put.links($scope.selectedId, n);
      $scope.links = getLinks($scope.selectedId);
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

  $scope.refresh = function(){
    Screens.refresh();
    $scope.screens = Screens.list();
  };

});
