function largestProduct(digit_string, sub_length) {
  var largest_product = 0;
  var current_product;
  var substr;
  var times = digit_string.length - sub_length;
  
  if (times <= 0) { return; }
  
  for (var i = 0; i <= times; i++) {
    substr = digit_string.substr(i, sub_length);
    
    if (/0/.test(substr)) { continue; }
    
    current_product = product(substr);
    if (current_product > largest_product) { largest_product = current_product; }
  }  
  return largest_product;
}

function product(digits) {
  return [].reduce.call(digits, function(total, next) {
    return total * next;
  });
}

onmessage = function(message) {
  var digit_string = message.data[0];
  var sub_length = message.data[1];
  
  postMessage(largestProduct(digit_string, sub_length));
};