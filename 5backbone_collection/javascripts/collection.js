var App = {
  $body: $("tbody"),
  template: Handlebars.compile($("#items").html()),
  removeItem: function(e) {
    e.preventDefault();
    var model = this.Items.get(Number($(e.target).attr("data-id")));
    this.Items.remove(model);
  },
  bind: function() {
    this.$body.on("click", "a", this.removeItem.bind(this));
  },
  init: function() {
    // pass array of models on collection instantiation
    this.Items = new ItemsCollection(items_json);
    this.Items.sortByName();
    this.bind();
    this.Items.render();
  },
};

var ItemModel = Backbone.Model.extend({
  idAttribute: "id",
  initialize: function() {
    // id will be incremented every time a model is added to the collection
    this.collection.incrementID();
    this.set("id", this.collection.last_id);
  },
});

var ItemsCollection = Backbone.Collection.extend({
  last_id: 0,
  model: ItemModel,
  incrementID: function() {
    this.last_id++;
  },
  sortBy: function(prop) {
    this.models = _(this.models).sortBy(function(m) {
      return m.attributes[prop];
    });
    this.render();
  },
  sortByName: function() { this.sortBy("name") },
  render: function() {
    App.$body.html(App.template({
      items: this.models
    }));
  },
  initialize: function() {
    this.on("remove reset", this.render);
    this.on("add", this.sortByName);
  },
});

Handlebars.registerPartial("item", $("#item").html());

$("form").on("submit", function(e) {
  e.preventDefault();
  var attrs = {};
  var inputs = $(this).serializeArray();
  
  inputs.forEach(function(input) {
    attrs[input.name] = input.value;
  });
  
  App.Items.add(attrs);
  
  this.reset();
});

$("th").on("click", function() {
  var prop = $(this).attr("data-prop");
  App.Items.sortBy(prop);
});

$("p a").on("click", function(e) {
  e.preventDefault();
  
  App.Items.reset();
});

App.init();