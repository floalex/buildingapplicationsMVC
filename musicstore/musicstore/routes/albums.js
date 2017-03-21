var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/albums.json");

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function nextID() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id + 1;
}

function writeAlbums(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

module.exports = function(router) {
  router.post("/albums", function(req, res) {
    var album = req.body;
    var albums = getAlbums();
    
    album.id = nextID();
    albums.push(album);
    writeAlbums({ last_id: album.id, data: albums });
    res.json(album);
  });
  
  router.get("/albums/new", function(req, res) {
    res.render("new");
  });
};
