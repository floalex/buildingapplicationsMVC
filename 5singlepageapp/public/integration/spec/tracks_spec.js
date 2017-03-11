var album = 'Unbreakable Smile (Bonus Track Version)';

describe("Tracks Collection", function() {
  it ("fetches a collection of track modal", function(done) {
    var tracks = new (Tracks.extend({
      url: "/albums/" + album + ".json",
    }));
    
    tracks.fetch({
      success: function() {
        expect(tracks.length).toBeGreaterThan(0);
        expect(tracks.models[0].attributes.title).toBeDefined();
        expect(tracks.models[0].attributes.length).toBeDefined();
        done();
      },
    });
  });
});