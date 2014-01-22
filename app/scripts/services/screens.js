angular.module('orbApp').service('Screens', function Screens($http) {
  'use strict';

  var screens = {
    meta: {
      count: 0,
      fileKeyMap: {},
//      absPath: '/Users/Admin/Documents/SSC Projects/ThaiBank/www/',
      absPath: '/Users/Admin/Documents/GitHub/lop/www/',
      landingScreen: ''
    }
  };

  var isNodeApp = function () {
    if (typeof require === 'undefined') {
      return false;
    } else {
      return true;
    }
  };

  var isImage = function (fileName) {
    var ext = fileName.split('.').pop();

    if (_.contains(['jpg', 'png', 'jpeg', 'gif'], ext)) {
      return true;
    } else {
      return false;
    }
  };

  var storeInLS = function () {
    if (isNodeApp()) {
      var fs = require('fs');
      var data = JSON.stringify(screens, null, 2);
      fs.writeFile(screens.meta.absPath + 'projfile.json', data, function (err) {
        if (err) {
          console.log(err);
        }
      });

      var scriptPromise = $http.get('resources/app.js');

      scriptPromise.then(function (scriptFile) {

        var scriptFile = scriptFile.data.replace(/<replaceMeWithProjectFile>/g, 'var projfile = ' + data);

        fs.writeFile(screens.meta.absPath + 'app.js', scriptFile, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });

      var indexPromise = $http.get('resources/index.html');

      indexPromise.then(function (indexFile) {
        fs.writeFile(screens.meta.absPath + 'index.html', indexFile.data, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });

      var indexPromise = $http.get('resources/style.css');

      indexPromise.then(function (styleFile) {
        fs.writeFile(screens.meta.absPath + 'style.css', styleFile.data, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });

    } else {
      localStorage.screens = JSON.stringify(screens);
    }
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

  if (!isNodeApp()) {
    screens.meta.absPath = 'storage';
  }

  var add = function (fileName) {
    if (typeof screens.meta.fileKeyMap[fileName] === 'undefined') {
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
    }
  };

  var list = function () {
    var files;
    if (!isNodeApp()) {
      if (typeof localStorage.screens !== 'undefined') {
        screens = JSON.parse(localStorage.screens);
      }
      else {
        files = ['landing-final.jpg',
          'screen3_lob_bar-view.jpg',
          'screen7_project.jpg',
          'screen10_actions.jpg',
          'screen4_accounts.jpg',
          'screen7_project_staffing.jpg',
          'screen1_flc-G&A_revised.jpg',
          'screen4_other_accounts.jpg',
          'screen8_subcontractors.jpg',
          'screen1_flc.jpg',
          'screen5_all-projects-bar_view.jpg',
          'screen9_span.jpg',
          'screen1_landing.jpg',
          'screen5_all-projects.jpg',
          'screen2_lob_donut-view.jpg',
          'screen6_selected-project.jpg'];
        _.each(files, function (file) {
          add(file);
        });
      }
    } else {
      var fs = require('fs');
      var projectData = fs.readFileSync(screens.meta.absPath + 'projfile.json', {encoding: 'utf8'});

      screens = JSON.parse(projectData);

      files = fs.readdirSync(screens.meta.absPath + 'images/');

      _.each(files, function (file) {
        if (isImage(file)) {
          add(file);
        }
      });
    }

    var screensArr = _.values(screens);
    screensArr.splice(0, 1);

    return screensArr;
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
      },
      meta: function () {
        return screens.meta;
      },
      fileName: function (id) {
        return screens[id].fileName;
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
        storeInLS();
      },
      linkSize: function (screen, link, size) {
        screens[screen].links[link].height = size.height;
        screens[screen].links[link].width = size.width;
        storeInLS();
      },
      path: function (path) {
        screens.meta.absPath = path;
        storeInLS();
      },
      landingScreen: function (screen) {
        screens.meta.landingScreen = screen;
        storeInLS();
      }
    }
  };
});
