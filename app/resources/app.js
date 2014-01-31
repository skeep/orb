;
(function() {
  replaceMeWithProjectFile;


  function createScreen(fileObj) {
    var screen = document.createElement('div');
    screen.setAttribute('id', fileObj.name);
    screen.setAttribute('class', 'screen');
    screen.setAttribute('style', 'display:none');

    var image = document.createElement('img');
    image.setAttribute('src', 'images/' + fileObj.fileName);
    screen.appendChild(image);

    var links = fileObj.links;

    for (link in links) {
      screen.appendChild(createLink(fileObj.links[link]));
    }

    return screen;
  }

  function createLink(linkObj) {
    var linkElem = document.createElement('a');
    var target = projfile[linkObj.target].name;
    linkElem.setAttribute('href', '#' + target);
    linkElem.setAttribute('class', 'link');
    linkElem.setAttribute('style', 'top:' + linkObj.top + '%; left:' + linkObj.left + '%; width:' + linkObj.width + '%; height:' + linkObj.height + '%');
    linkElem.addEventListener('click', function(event) {
      document.getElementById(selectedScreenId).setAttribute('style', 'display:none');
      var screenId = projfile.meta.fileKeyMap[(target + '.jpg')];
      selectedScreenId = projfile[screenId].name;
      location.hash = '#' + selectedScreenId;
      document.getElementById(selectedScreenId).removeAttribute('style');
    });

    return linkElem;
  }

  var imagesFragment = document.createDocumentFragment();
  for (file in projfile) {
    if (file !== 'meta') {
      imagesFragment.appendChild(createScreen(projfile[file]));
    }
  }

  document.getElementById('screens').appendChild(imagesFragment);

  var landingScreen = projfile[projfile.meta.landingScreen].name

  document.getElementById(landingScreen).removeAttribute('style');

  var selectedScreenId = landingScreen;


})();