var largestProduct = new Worker("javascripts/largest_product_v2.js");

$(function() {
  var $answer = $("strong");
  var $form = $("form");
  
  $form.on("submit", function(e) {
    e.preventDefault();
    var numeric_string = $form.find("#numeric_string").val().replace(/\s/gm, "");
    
    largestProduct.postMessage([numeric_string, Number($form.find("#adjacent_count").val())]);
  });
  
  largestProduct.addEventListener("message", function(message) {
    $answer.text(message.data);
  });
});