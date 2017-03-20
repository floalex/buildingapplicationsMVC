// need to start the server to test
var request = require('request');
var root = "https://ls-javascript-floalex.c9users.io/";
var albums;

describe("JSON Routes", function() {
  describe("/albums.json", function() {
    it("returns an array of albums", function(done) {
      // "http://localhost:3000/albums.json when running on local machine" to test http working
      request(root + "albums.json", function(error, response, body) {
        albums = JSON.parse(body);
        expect(albums[0].artist).toBeDefined();
        done();
      });
    });
  });
  
  describe("/albums/<album>.json", function() {
    it("returns an array of tracks", function(done) {
      request(root + "albums/" + albums[0].title + ".json", function(e, res, body) {
        expect(JSON.parse(body)[0].title).toBeDefined();
        done();
      });
    });
  });
});