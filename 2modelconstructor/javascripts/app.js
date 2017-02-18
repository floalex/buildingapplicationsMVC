var template = Handlebars.compile($("#cars").html());

var Car = new ModelConstructor(); // console.log(Car); // function Model(attrs)
var Cars = new CollectionConstructor(); // console.log(Cars); // function Collection(model_constructor)
var inventory = new Cars(Car); // console.log(inventory); // Collection {models: Array[0], model: Model(attrs)}

inventory.add({
  make: "BMW",
  model: "328i"
});
inventory.add({
  make: "Mini",
  model: "Cooper"
});
inventory.add({
  make: "Lotus",
  model: "Elise"
});

$("a").on("click", function(e) {
  e.preventDefault();

  inventory.resetCollection();
  render();
});

$("form").on("submit", function(e) {
  e.preventDefault();
  var $form = $(this);
  var properties = {
        make: $form.find("[name=make]").val(),
        model: $form.find("[name=model]").val()
      };

  inventory.add(properties);
  render();
  $form[0].reset();  // this.reset();
});

render();

function render() {
  $("article").html(template({ cars: inventory.models }));
}