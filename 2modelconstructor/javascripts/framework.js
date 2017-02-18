function ModelConstructor(options) {
  var id_count = 0;
  
  function Model(attrs) {
    id_count++;
    
    var self = this;
    // we don't want to accidentally share the attributes between each instances
    // so don't put it in the prototype
    self.attributes = attrs || {};
    // this.id used to locate the model within a collection
    // this.attributes.id will be made available for public use and editing
    self.id = id_count;
    self.attributes.id = id_count;
    
    // prefixed with two underscores: this is a convention in the JavaScript to 
    // prefix properties and methods that are meant to be private 
    if(options && options.change && _.isFunction(options.change)) {
      return this.__events.push(options.change);
    }
  }
  
  Model.prototype = {
    __events: [],
    set: function(key, value) {
      this.attributes[key] = value;
      this.triggerChange();
    },
    get: function(key) {
      return this.attributes[key];
    },
    remove: function(key) {
      delete this.attributes[key];
      this.triggerChange();
    },
    triggerChange: function() {
      this.__events.forEach(function(callback) {
        callback();
      });
    },
    // new change event callbacks after the model is created
    addCallBack: function(callback) {
      this.__events.push(callback);
    },
  };
  
  _.extend(Model.prototype, options);
  
  return Model;
}

