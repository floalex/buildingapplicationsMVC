describe("Vehicle constructor", function() {
  beforeEach(function() {
    this.car = new Vehicle({
      make: "Honda",
      model: "Civic",
    });
  });
  
  it("sets the make and model properties when an object is passed in", function() {
    expect(this.car.make).toEqual("Honda");
    expect(this.car.model).toEqual("Civic");
  });
  
  it("returns a concatenated string with make and model", function() {
    expect(this.car.toString()).toEqual("Honda Civic");
    this.car.model = "CR-Z";
    expect(this.car.toString()).toEqual("Honda CR-Z");
  });
  
  it("returns a message when the horn is honked", function() {
    var message = this.car.honkHorn();
    expect(message).toMatch(/beep/);
  });
});