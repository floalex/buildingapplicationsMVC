var CartView = Backbone.View.extend({
  template: App.templates.cart,
  el: $("#cart"),
  events: {
    "click a.delete": "destroy"
  },
  destroy: function(e) {
    e.preventDefault();
    var $e = $(e.target);
    console.log($e);
    // trigger event that bound to collection
    this.collection.trigger("destroy", Number($e.attr("data-id")));
    this.render();
  },
  render: function() {
    this.$el.html(this.template({
      quantity: this.collection.getQuantity(),
      items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, "cart_updated", this.render);
  }  
});
