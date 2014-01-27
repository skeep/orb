angular.module('orbApp').service('File', function File($http) {

  'use strict';

  var absPath = '';

  var count = '0';

  var isNodeApp = function () {
    if (typeof require === 'undefined') {
      return false;
    } else {
      return true;
    }
  };

  if (isNodeApp()) {
    var fs = require('fs');
  }

  var setPath = function (path) {
    absPath = path;
  };

  var createFile = function (file) {
    var filePromise = $http.get('resources/' + file);

    filePromise.then(function (fileStream) {
      fs.writeFile(absPath + file, JSON.stringify(fileStream.data), function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  };

  var saveFile = function (file, data) {
    console.log('saving project file with = ' + absPath + file, data);
    fs.writeFileSync(absPath + file, data);
  };

  var saveProject = function (screens) {
    if (isNodeApp()) {

      var data = JSON.stringify(screens, null, 2);

      saveFile('projfile.json', data);

      var scriptPromise = $http.get('resources/app.js');

      scriptPromise.then(function (scriptFile) {

        scriptFile = scriptFile.data.replace(/replaceMeWithProjectFile;/g, 'var projfile = ' + data);

        saveFile('app.js', scriptFile);
      });

    } else {
      localStorage.screens = JSON.stringify(screens);
    }
  };

  return {
    create: {
      project: function () {
        createFile('projfile.json');
      },
      index: function () {
        createFile('index.html');
      },
      style: function () {
        createFile('style.css');
      },
      imgFolder: function () {
        fs.mkdir(absPath + 'images');
      }
    },
    save: {
      path: setPath,
      project: saveProject
    }
  };

});
