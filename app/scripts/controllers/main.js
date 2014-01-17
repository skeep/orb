angular.module('orbApp').controller('MainCtrl', function ($scope, Screens) {
  'use strict';

  var files = [];
  _.times(10, function (i) {
    files.push('image' + (i + 1) + '.png');
  });

  if (typeof localStorage.screens === 'undefined') {
    _.each(files, function (file) {
      Screens.add(file);
    });
  }

  $scope.screens = Screens.list();
  $scope.linkMaps = {};
  $scope.selectedLinks = [];
  $scope.selectedId = '';
  $scope.links = [];

  $scope.getLinkMaps = function(){
    $scope.linkMaps = Screens.get.linkMaps($scope.selectedId);
  };

  var getLinks = function(selectedId){
    if($scope.selectedId !== ''){
      return Screens.get.links(selectedId);
    } else {
      return [];
    }
  };

  $scope.linksCount = function(screen){
    return _.values(screen.links).length;
  };

  $scope.$watch('linkMaps', function(n){
    if(!_.isEmpty($scope.selectedId)){
      Screens.put.links($scope.selectedId, n);
    }
  }, true);

  $scope.$watch('selectedId', function(n){
    $scope.links = getLinks(n);
  });
});
