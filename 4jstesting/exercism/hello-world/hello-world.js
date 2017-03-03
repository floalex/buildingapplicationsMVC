var HelloWorld = function() {};

HelloWorld.prototype.hello = function(input) {
  return "Hello, " + (input || "World") + "!";
};

// module.exports, a property designated for transporting the contents of a module 
// to another Javascript file using 'require' statement in spec.js
module.exports = HelloWorld;