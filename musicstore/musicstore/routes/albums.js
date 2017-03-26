var _ = require('underscore');
var path = require("path");
var Albums = require(path.resolve(path.dirname(__dirname), "routes/albums_node"));

module.exports = function(router) {
  router.route("/albums").get(function(req, res) {
    res.json(Albums.get());
  }).post(function(req, res) {
    var album = req.body;
    var albums = Albums.get();
    
    album.id = Albums.nextID();
    albums.push(album);
    Albums.set({ last_id: album.id, data: albums });
    res.json(album);
  });
  
  router.get("/albums/new", function(req, res) {
    res.render("new", {
      albums: Albums.get()
    });
  });
  
  router.get("/albums/:id/edit", function(req, res) {
    res.render("edit", {
      albums: Albums.get()
    });
  });
  
  router.route("/albums/:id").get(function(req, res) {
    res.render("view", {
      albums: Albums.get()
    });
  }).put(function(req, res) {
    var albums = Albums.get();
    var album_id = Number(req.params.id);
    var current_album = _(albums).findWhere({ id: album_id });
    
    _.extend(current_album, req.body);
    // need to set the id back otherwise the id will become string 
    current_album.id = album_id;
    Albums.set({ last_id: Albums.getLastID(), data: albums });
    res.json(current_album);
  }).delete(function(req, res) {
    var albums = _(Albums.get()).reject(function(item) {
      // need to pass params.id to successfully delete the item in JSON
      return item.id === Number(req.params.id);
    });
    
    Albums.set({ last_id: Albums.getLastID(), data: albums });
    res.states(200).end();
  });
};
