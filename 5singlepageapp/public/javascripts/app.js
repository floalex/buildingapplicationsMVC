var App = {
  albumsLoaded: function() {
    this.view.render();
  },
  fetchAlbums: function() {
    this.albums = new Albums();
    this.view = new AlbumsView({ collection: this.albums });
    // sends HTTP GET to /albums.json
    this.albums.fetch({
      success: this.albumsLoaded.bind(this),
    });
  },
  tracksLoaded: function(tracks) {
    var tracks_modal = new TracksView({
      collection: tracks,
      album: this.selected_album.toJSON(),
    });
    
    tracks_modal.render();
    this.tracks = tracks_modal;
  },
  fetchTracks: function(name) {
    var tracks = new (Tracks.extend({
      url: "/albums/" + name + ".json",
    }))();
    
    // Set the selected_album property on App to be the album model
    this.selected_album = this.albums.findWhere({ title: name});
    
    tracks.fetch({
      success: this.tracksLoaded.bind(this),
    });
  },
  // need to extend the Tracks collection so can specify url
  init: function() {
    this.fetchAlbums();
  },
};

var Router = Backbone.Router.extend({
  routes: {
    "albums/:title": "getAlbum",
  },
  getAlbum: function(title) {
    App.fetchTracks(title);
  },
  index: function() {
    // go back to the route without /albums will fadeout the tracks view
    // won't trigger when open the track page
    
    // if (!App.tracks.$el.is(':animated')) {
      App.tracks.fadeOut();
    // }
  },
  initialize: function() {
    // create a route starts with '/' and listen
    // same as adding "": ""index" in routes property
    this.route(/^\/?$/, "index", this.index);
  },
});

var router = new Router();

Backbone.history.start({
  pushState: true,
  // prevent the initial route to trigger when starting History
  // remove silent option will cause Uncaught TypeError: Cannot read property '$el' of undefined on line 48
  silent: true,
});

// listening for clicks on any anchors that start with a root path e.g. "/album/1989.json"
$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  // navigate to albums/:title and fire getAlbum method
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), {trigger: true});
});