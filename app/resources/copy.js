var fs = require('fs');


try {
  var projectData = fs.readFileSync('a', {encoding: 'utf8'});
  console.log(projectData);
} catch (e) {
  console.log(e);
}




