var itemModel = Backbone.Model.extend({
  idAttribute: "id"
});

var Items = {
  $body: $("tbody"),
  collection: [],
  create: function(item_data) {
    item_data.id = this.collection.length + 1;
    var item = new itemModel(item_data);
    
    this.collection.push(item);
    
    return item;
  },
  render: function() {
    this.$body.html(template({
      items: this.collection
    }));
  },
  seedCollection: function() {
    items_json.forEach(this.create.bind(this));
  },
  remove: function(e) {
    e.preventDefault();
    var $e = $(e.target);
    var model = _(this.collection).findWhere({id: +$e.attr("data-id")});
    
    this.collection = _(this.collection).without(model);
    this.render();
  },
  empty: function(e) {
    this.collection = [];
    this.render();
  },
  sortBy: function(prop) {
    this.collection = _(this.collection).sortBy(function(model) {
      return model.attributes[prop];
    });
    this.render();
  },
  bind: function() {
    this.$body.on("click", "a", this.remove.bind(this));
  },
  init: function() {
    this.bind();
    this.seedCollection();
    this.render();
  },
};

var template = Handlebars.compile($("#items").html());

Handlebars.registerPartial("item", $("#item").html());

$("form").on("submit", function(e) {
  e.preventDefault();
  var attrs = {};
  var inputs = $(this).serializeArray();
  var item;
  
  inputs.forEach(function(input) {
    attrs[input.name] = input.value;
  });
  
  item = Items.create(attrs);
  Items.$body.append(Handlebars.partials.item(item.toJSON()));
  this.reset();
});

$("th").on("click", function() {
  var prop = $(this).attr("data-prop");
  Items.sortBy(prop);
});

$("p a").on("click", function(e) {
  e.preventDefault();
  
  Items.empty();
});

Items.init();