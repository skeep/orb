angular.module('orbApp').directive('draggable', function (Screens) {
  'use strict';
  return {
    restrict: 'A',
    link: function postLink(scope, element) {
      element.draggable({
        handle: 'span',
        containment: '.image',
        stop: function (event, ui) {
          Screens.put.linkPosition(scope.$parent.selectedId, element[0].id, ui.position);
        }
      });
    }
  };
});