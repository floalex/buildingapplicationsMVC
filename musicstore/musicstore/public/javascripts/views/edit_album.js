var EditAlbumView = Backbone.View.extend({
  template: App.templates.edit_album,
  attributes: {
    id: "album_edit"
  },
  events: {
    "submit": "update"
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    App.el.html(this.$el);
  },
  update: function(e) {
    e.preventDefault();
    var $f = this.$("form");
    
    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(json) {
        var album = App.albums.get(json.id);
        
        App.albums.add(json, { merge: true });
        App.indexView();
      }
    });
  },
  initialize: function() {
    this.render();
  }
});