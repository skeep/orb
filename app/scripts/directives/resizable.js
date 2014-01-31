angular.module('orbApp').directive('resizable', function (Screens) {
  'use strict';
  return {
    restrict: 'A',
    link: function postLink(scope, element) {
      element.resizable({
        stop: function (event, ui) {
          Screens.put.linkSize(scope.$parent.selectedId, element[0].id, ui.size, scope.dimensions);
        }
      });
    }
  };
});
