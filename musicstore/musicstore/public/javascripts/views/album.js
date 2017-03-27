var AlbumView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.album,
  events: {
    "click a.delete": "deleteAlbum",
    "click a.edit": "updateAlbum",
    "click a.button": "addToCart"
  },
  updateAlbum: function(e) {
    e.preventDefault();
    // need to pass id to the function 
    var id = this.model.get("id");
    App.editAlbum(id);
  },
  deleteAlbum: function(e) {
    e.preventDefault();
    var answer = confirm("Are you sure you want to delete this album");
    if (!answer) { return; }
 
    this.model.destroy();
  },
  addToCart: function(e) {
    e.preventDefault();
    // sends the model to the cart collection
    App.trigger("add_to_cart", this.model);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.el.find("ul"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
    this.listenTo(this.model, "remove", this.remove);
  },
});