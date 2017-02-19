var Car = new ModelConstructor(); // console.log(Car); // function Model(attrs)
var Cars = new CollectionConstructor(); // console.log(Cars); // function Collection(model_constructor)
var CarView = new ViewConstructor({
      tag_name: "li",
      template: Handlebars.compile($("#cars").html()),
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
