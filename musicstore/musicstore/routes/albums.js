var _ = require('underscore');
var path = require("path");
var Albums = require(path.resolve(path.dirname(__dirname), "routes/albums_node"));

module.exports = function(router) {
  router.post("/albums", function(req, res) {
    var album = req.body;
    var albums = Albums.get();
    
    album.id = Albums.nextID();
    albums.push(album);
    Albums.set({ last_id: album.id, data: albums });
    res.json(album);
  });
  
  router.get("/albums/new", function(req, res) {
    res.render("new");
  });
};
