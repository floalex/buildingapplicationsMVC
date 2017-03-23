var AlbumView = Backbone.View.extend({
  tagName: "li",
  template: App.templates.album,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo(App.el.find("ul"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
  },
});