var $overlay = $("#overlay");

var TracksView = Backbone.View.extend({
  attributes: {
    id: "tracks_modal",
  },
  template: Handlebars.compile($("[data-name=tracks]").html()),
  duration: 300,
  events: {
    "click a.close": "close",
  },
  open: function() {
    // fade in the element and overlay
    this.$el.add($overlay).fadeIn(this.duration);
  },
  close: function(e) {
    e.preventDefault();
    this.fadeOut();
    history.back();
  },
  fadeOut: function() {
    // separate fadeout actions as we don't want to remove the $overlay element
    // stop any animation before fading out
    $overlay.stop().fadeOut(this.duration);
    // only want to remove the tracd's view element
    this.$el.stop().fadeOut(this.duration, function() {
      this.remove();
    }.bind(this));
  },
  render: function() {
    this.$el.html(this.template({
      tracks: this.collection.toJSON(),
      album: this.album
    }));
    this.open();
  },
  initialize: function(options) {
    this.album = options.album;
    this.$el.appendTo(document.body);
  },
});