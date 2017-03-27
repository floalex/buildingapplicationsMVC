var App = {
  templates: JST,
  el: $("main"),
  indexView: function() {
    this.index = new IndexView();
    this.renderAlbums();
    this.createCart();
    this.bindEvents();
  },
  renderAlbums: function() {
    this.albums.each(this.renderAlbumView);
  },
  renderAlbumView: function(album) {
    new AlbumView({
      model: album
    });
  },
  newAlbum: function() {
    new NewAlbumView();
  },
  editAlbum: function(id) {
    var album = this.albums.find(function(album) {
      return album.id === id;
    });    
    new EditAlbumView({ model: album });
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart
    });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.index, "add_album", this.newAlbum);
    this.on("add_to_cart", this.cart.addItem.bind(this.cart));
  },
};

Handlebars.registerHelper("format_price", function(price) {
  return (+price).toFixed(2);
});