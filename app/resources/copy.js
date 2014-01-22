var fs = require('fs');

var path = '/Users/Admin/Documents/GitHub/lop/www/';

console.log(fs.createReadStream('style.css'));

fs.createReadStream('index.html').pipe(fs.createWriteStream(path + 'index.html'));
fs.createReadStream('style.css').pipe(fs.createWriteStream(path + 'style.css'));

