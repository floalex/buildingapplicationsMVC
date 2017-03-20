describe("Albums collection", function() {
  it("fetches a collection of three albums", function(done) {
    // Store the original App.albumsLoaded method in a local variable
    var albumsLoaded = App.albumsLoaded;
    // Replace App.albumsLoaded with a method used to run expect statements
    App.albumsLoaded = function() {
      // Call local albumsLoaded function by applying it with the App context and current arguments 
      albumsLoaded.apply(App, arguments);
      expect(App.albums.models.length).toBe(3);
      expect(typeof App.albums.models[0].attributes.title).toBe("string");
      done();
    };
    
    App.init(); // will call App.albumsLoaded on success
  });
  
  it ("sets a tracks_url property when models are created", function(done) {
    App.albumsLoaded = function() {
      expect(App.albums.first().get("tracks_url")).toMatch(/\album/);
      done();
    };
    
    App.init();
  });
});