var path = require('path');
var Albums = require(path.resolve(path.dirname(__dirname), "routes/albums_node"));

/* GET home page. */
module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', { 
      albums: Albums.get()
    });
  });
};

