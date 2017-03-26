var router = new (Backbone.Router.extend({
  routes: {
    "albums/new": App.newAlbum,
    "albums/:id/edit": "edit"
  },
  index: function() { App.indexView(); },
  edit: function(id) {
    // need to convert the id to number
    App.editAlbum(Number(id));
  },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
  }
}))();

Backbone.history.start({
  pushState: true
});

$(document).on('click', 'a.back', function(e) {
  e.preventDefault();
  window.history.back();
});

$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trugger: true });
});
