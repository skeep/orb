angular.module('orbApp').controller('DesignerCtrl', function ($scope, $routeParams, $timeout, Screens) {
  'use strict';

  $scope.bar = {
    label: 'Hide',
    visible: true
  };

  $scope.new = false;
  $scope.open = false;
  $scope.screens = [];

  $scope.project = {
    name: '',
    path: ''
  };

  $scope.screens = [];
  $scope.screenMetaData = {};
  $scope.landingScreen = {};

  $scope.linkMaps = {};
  $scope.selectedLinks = [];
  $scope.selectedId = '';
  $scope.links = [];
  $scope.selectedFileName = '';

  $scope.dimensions = {
    width : 0,
    height :0
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

  var isValidPath = function () {
    return true;
  };

  var isNodeApp = function () {
    if (typeof require === 'undefined') {
      return false;
    } else {
      return true;
    }
  };

  var getImageDimensions = function(){
    $scope.dimensions = {
      width : $('.selected-image').width(),
      height :$('.selected-image').height()
    };
  };

  function setWatch() {

    $scope.$watch('linkMaps', function (n) {
      if (!_.isEmpty($scope.selectedId)) {
        Screens.put.links($scope.selectedId, n);
        $scope.links = getLinks($scope.selectedId);
      }
    }, true);

    $scope.$watch('selectedId', function (n) {
      $scope.links = getLinks(n);
      $timeout(getImageDimensions, 100);
    });

    $scope.$watch('screenMetaData.absPath', function (n) {
      Screens.put.path(n);
    });

    $scope.$watch('landingScreen', function (screen) {
      Screens.put.landingScreen(screen.id);
    });

    $scope.$watch('screenMetaData.projectName', function (n) {
      Screens.put.projectName(n);
    });

  }

  $scope.initProject = function (isNewProject) {

    Screens.init($scope.project.path, $scope.project.name, isNewProject);

    $scope.screens = Screens.list();
    $scope.screenMetaData = Screens.get.meta();
    $scope.landingScreen = $scope.screens[0];

    $scope.linkMaps = {};
    $scope.selectedLinks = [];
    $scope.selectedId = '';
    $scope.links = [];
    $scope.selectedFileName = '';

    $scope.new = false;
    $scope.open = false;

    setWatch();

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

  $scope.newProject = function () {
    $scope.new = true;
    $scope.open = false;
  };

  $scope.validProjectDetail = function () {
    if ($scope.project.name !== '' && isValidPath($scope.project.path)) {
      return true;
    } else {
      return false;
    }
  };

  $scope.cancelNewProject = function () {
    $scope.new = false;
    $scope.project.name = '';
    $scope.project.path = '';
  };

  $scope.cancelOpenProject = function () {
    $scope.open = false;
  };

  $scope.openProject = function () {
    $scope.open = true;
    $scope.new = false;
  };

  $scope.refresh = function () {
    Screens.refresh();
    $scope.screens = Screens.list();
  };

  $scope.nodeApp = isNodeApp();

  if (!$scope.nodeApp) {
    $scope.initProject();
  } else {
    setWatch();
  }

});
