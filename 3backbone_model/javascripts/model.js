// 2. create the product model constructor based on Backbone
var ProductModel = Backbone.Model.extend({
  setDateTime: function() {
    var date = new Date(this.get("date"));
    // datetime: "2015-05-01T10:30:24"
    var datetime = formatDatetime(date);
    
    this.set("datetime", datetime);
  },
  setDateFormatted: function() {
    var date = new Date(this.get("date"));
    // date_formatted: "May 1st, 2015 10:30:24"
    var date_formatted = formatDate(date);
    
    this.set("date_formatted", date_formatted);
  },
  initialize: function() {
    this.setDateTime();
    this.setDateFormatted();
  },
});

// 3. create a new product by passing the product json
var product = new ProductModel(product_json);

// 1. make templates object
var templates = {};

$("[type='text/x-handlebars']").each(function() {
  var $tmpl = $(this);
  templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
});

renderProduct();
renderForm();

$("form").submit("submit", function(e) {
  e.preventDefault();
  var date = new Date();
  var attrs = {};
  var inputs = $(this).serializeArray();
  
  inputs.forEach(function(input) {
    attrs[input.name] = input.value;
  });
  
  attrs.datetime = formatDatetime(date);
  attrs.date_formatted = formatDate(date);
  attrs.date = date.valueOf();
  product.set(attrs);
  renderProduct();
});

function renderProduct() {
  $("article").html(templates.product(product.toJSON()));
}

function renderForm() {
  $("fieldset").html(templates.form(product.toJSON()));
}

function formatDatetime(date) {
  return moment(date).format();
}

function formatDate(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss');
}
  
// function formatDatetime(date) {
//   var datetime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
//   datetime += "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
//   return datetime;
// }

// function formatDate(date) {
//   // May 1st, 2015 10:30:24
//   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       suffix_overrides = ["st", "nd", "rd"],
//       date_suffix = "th",
//       date_formatted;

//   if (date.getDate() <= suffix_overrides.length) {
//     date_suffix = suffix_overrides[date.getDate() - 1];
//   }
//   date_formatted = months[date.getMonth()] + " " + date.getDate() + date_suffix + ", " + date.getFullYear();
//   date_formatted += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
//   return date_formatted;
// }