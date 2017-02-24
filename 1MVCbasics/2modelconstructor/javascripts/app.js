var edit_form = Handlebars.compile($("#edit").html());
var Car = new ModelConstructor(); // console.log(Car); // function Model(attrs)
var Cars = new CollectionConstructor(); // console.log(Cars); // function Collection(model_constructor)
var CarView = new ViewConstructor({ // console.log(CarView); // function View(model)
      tag_name: "li",
      template: Handlebars.compile($("#cars").html()),
      events: {
        "dblclick": function() {
          this.$el.append(edit_form(this.model.attributes));
        },
        // Click event will be bound to parent `$el` to listen for clicks on "form a" elements
        // this.$el.on("click", "form a", function(e) { });
        "click form a": function(e) {
          e.preventDefault();
          this.$el.find("form").remove();
        },
        // Submit event will be bound to the parent `$el` with no delegated element
        // this.$el.on("submit", function(e) { });
        "submit": function(e) {
          e.preventDefault();
          var vals = $(e.target).serializeArray();
          this.model.set("make", vals[0].value);
          this.model.set("model", vals[1].value);
          this.$el.find("form").remove();
        },
      },
    });
var $cars = $("ul");
var inventory = new Cars(Car); // console.log(inventory); // Collection {models: Array[0], model: Model(attrs)}

inventory.set([{
  make: "BMW",
  model: "328i"
}, {
  make: "Mini",
  model: "Cooper"
}, {
  make: "Lotus",
  model: "Elise"
}]);

inventory.models.forEach(function(model) {
  var view = new CarView(model);  // console.log(view) // View {model: Model, $el: m.fn.init[1]}
  $cars.append(view.$el);
});

$("form a").on("click", function(e) {
  e.preventDefault();

  inventory.resetCollection();
  $cars.empty();
});

$("form").on("submit", function(e) {
  e.preventDefault();
  var $form = $(this);
  var properties = {
        make: $form.find("[name=make]").val(),
        model: $form.find("[name=model]").val()
      };
  var model;

  model = inventory.add(properties);
  $cars.append((new CarView(model)).$el);
  $form[0].reset();  // this.reset();
});

$cars.on("click", "a", function(e) {
  e.preventDefault();
  var $e = $(e.target);
  var model = inventory.get(+$e.attr("data-id"));

  model.view.remove();
  inventory.remove(model);
});
