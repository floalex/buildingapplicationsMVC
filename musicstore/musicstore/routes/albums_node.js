var path = require('path');
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/albums.json");

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function writeAlbums(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

var Albums = {
  get: function() {
    return getAlbums();
  },
  set: function(data) {
    if(!data.id) { this.nextID(); }
    writeAlbums(data);
  },
  getLastID: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id;
  },
  nextID: function() {
    return this.getLastID()+ 1;
  }
};

module.exports = Albums;