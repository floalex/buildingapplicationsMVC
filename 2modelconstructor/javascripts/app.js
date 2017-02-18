var template = Handlebars.compile($("#cars").html());

var Car = new ModelConstructor(); // console.log(Car); // function Model(attrs)
var Cars = new CollectionConstructor(); // console.log(Cars); // function Collection(model_constructor)
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

$("ul").on("click", "a", function(e) {
  e.preventDefault();
  var $e = $(e.target);

  inventory.remove(+$e.attr("data-id"));
  $e.closest("li").remove();
});

render();

function render() {
  $("article").html(template({ cars: inventory.models }));
}