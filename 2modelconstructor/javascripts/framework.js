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

function CollectionConstructor(options) {
  function Collection(model_constructor) {
    this.models = [];
    this.model = model_constructor;
  }
  
  Collection.prototype = {
    resetCollection: function() {
      this.models = [];
    },
    add: function(model_attrs) {
      var old_model = _(this.models).findWhere({id: model_attrs.id});
      var new_model;
      
      if (old_model) { return old_model; }
      
      new_model = new this.model(model_attrs);
      this.models.push(new_model);
      
      return new_model;
    },
    remove: function(model_attrs) {
      model_attrs = _.isNumber(model_attrs) ? {id: model_attrs} : model_attrs;
      
      var model = _(this.models).findWhere(model_attrs);
      
      if(!model) { return; }
      
      var position = this.models.indexOf(model);
      this.models.splice(position, 1);
    },
  };
  
   _.extend(Collection.prototype, options);
  
  return Collection;
}

