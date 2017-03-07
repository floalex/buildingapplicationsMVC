function Honda(model) {
  var current_model = this.verify(model);
  
  if (!current_model) {
    throw new Error("Model" + model + " does not exist");
  }
  
  this.make = "Honda";
  this.model = model;
  this.price = Honda.getPrice(model);
}

var models = ["Accord", "Civic", "Crosstour", "CR-V", "CR-Z", "Fit", "HR-V", "Insight", "Odyssey", "Pilot"];
var prices = [16500,    14500,   21000,       15800,  12000,  13100, 16000,  18100,     22500,     19300];

// clone the vehicle prototype
Honda.prototype = Object.create(Vehicle.prototype);

Honda.prototype.verify = function(model) {
  return models.indexOf(model) !== -1;
};

Honda.getPrice = function(model) {
  return prices[models.indexOf(model)];
};

// Create an object class method on the Honda object called getModels that 
// returns a copy of the models array.
Honda.getModels = function() { return models.slice() };

Honda.constructor = Honda;