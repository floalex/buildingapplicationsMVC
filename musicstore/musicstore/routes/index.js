var path = require('path');
var fs = require('fs');
var route_path = path.resolve(path.dirname(__dirname), "data/albums.json");

function getAlbums() {
  return JSON.parse(fs.readFileSync(route_path, "utf8")).data;
}

/* GET home page. */
module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', { 
      albums: getAlbums()
    });
  });
};

