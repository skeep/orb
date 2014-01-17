angular.module('orbApp').service('Screens', function Screens() {
  'use strict';

  var screens = {
    meta: {
      count: 0,
      fileKeyMap: {}
    }
  };

  var add = function (fileName) {

    var screenId = generateID();

    screens[screenId] = {
      id: screenId,
      fileName: fileName,
      name: removeExtension(fileName),
      links: {}
    };

    screens.meta.count = screens.meta.count + 1;

    screens.meta.fileKeyMap[fileName] = screenId;

    storeInLS();
  };

  var list = function () {
    if (typeof localStorage.screens !== 'undefined') {
      screens = JSON.parse(localStorage.screens);
    }
    var screensArr = _.values(screens);
    screensArr.splice(0, 1);
    return screensArr;
  };

  var storeInLS = function () {
    localStorage.screens = JSON.stringify(screens);
  };

  var removeExtension = function (fileName) {
    return fileName.substring(0, fileName.length - 4);
  };

  var generateID = function () {
    var s = [],
      itoh = '0123456789ABCDEF';
    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    var i, j;
    for (i = 0; i < 36; i++) {
      s[i] = Math.floor(Math.random() * 0x10);
    }
    // Conform to RFC-4122, section 4.4
    s[14] = 4; // Set 4 high bits of time_high field to version
    s[19] = (s[19] && 0x3) || 0x8; // Specify 2 high bits of clock sequence
    // Convert to hex chars
    for (j = 0; j < 36; j++) {
      s[j] = itoh[s[j]];
    }
    // Insert '-'s
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
  };

  return {
    add: add,
    list: list,
    get: {
      linkMaps: function (id) {
        var linkObj = {};
        _.each(screens[id].links, function (link) {
          linkObj[link.target] = true;
        });
        return linkObj;
      },
      links: function (id) {
        var links = [];
        var linksClone = angular.copy(screens[id].links);
        console.log('linksClone', linksClone);
        links = _.values(linksClone);
        _.each(links, function (link) {
          var targetId = link.target;
          link.target = {
            id: targetId,
            name: screens[targetId].name,
            fileName: screens[targetId].fileName
          };
        });
        return links;
      }
    },
    put: {
      links: function (id, links) {
        _.each(links, function (link, key) {
          if (typeof screens[id].links[key] === 'undefined') {
            if (link) {
              screens[id].links[key] = {
                target: key,
                top: 0,
                left: 0,
                width: 100,
                height: 100
              };
            }
          } else {
            if (!link) {
              delete screens[id].links[key];
            }
          }
        });
        storeInLS();
      },
      linkPosition: function (screen, link, position) {
        screens[screen].links[link].top = position.top;
        screens[screen].links[link].left = position.left;
        console.log(screens);
        storeInLS();
      },
      linkSize: function (screen, link, size) {
        screens[screen].links[link].height = size.height;
        screens[screen].links[link].width = size.width;
        console.log(screens);
        storeInLS();
      }
    }
  };
});
