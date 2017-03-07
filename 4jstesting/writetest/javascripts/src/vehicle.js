function Vehicle(ops) {
  this.make = ops.make;
  this.model = ops.model;
}

Vehicle.prototype = {
  toString: function() {
    return this.make + " " + this.model; 
  },
  honkHorn: function() {
    return "Beep beep!";
  }
};