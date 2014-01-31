angular.module('orbApp').directive('draggable', function (Screens) {
  'use strict';
  return {
    restrict: 'A',
    link: function postLink(scope, element) {
      element.draggable({
        handle: scope.draggableHandle,
        containment: 'div.selected-screen',
        scope : {},
        stop: function (event, ui) {
          Screens.put.linkPosition(scope.$parent.selectedId, element[0].id, ui.position, scope.dimensions );
        }
      });
    }
  };
});