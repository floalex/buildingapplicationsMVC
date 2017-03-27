var CartItems = Backbone.Collection.extend({
  setTotal: function(){
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.price * b.quantity;
    }, 0);
  },
  getTotal: function() { return this.total; },
  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);
  },
  getQuantity: function() { return this.quantity; },
  addItem: function(item) {
    item = item.clone();
    item.set("quantity", 1);
    this.add(item);
    this.setTotal();
    this.setQuantity();
    this.trigger("cart_updated");
  }
});