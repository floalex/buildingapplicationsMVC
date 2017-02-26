function ModelConstructor(options) {
  var id_count = 0;
  
  function Model(attrs) {
    id_count++;
    
    // we don't want to accidentally share the attributes between each instances
    // so don't put it in the prototype
    this.attributes = attrs || {};
    // this.id used to locate the model within a collection
    // this.attributes.id will be made available for public use and editing
    this.id = id_count;
    this.attributes.id = id_count;
    
    // prefixed with two underscores: this is a convention in the JavaScript to 
    // prefix properties and methods that are meant to be private 
    if(options && options.change && _.isFunction(options.change)) {
      return this.__events.push(options.change);
    }
  }
  
  Model.prototype = {
    __events: [],
    __remove: function() {},
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
      
      model.__remove();  // won't do anything if the model doesn't have a view
      var position = this.models.indexOf(model);
      this.models.splice(position, 1);
    },
    set: function(models) {
      this.resetCollection();
      models.forEach(this.add.bind(this));
      // var self = this;
      // models.forEach(function(model) {
      //   self.add(model);
      // });
    },
    get: function(id) {
      return _(this.models).findWhere({ id: id });
      // return this.models.filter(function(model) {
      //   return model.id === id;
      // })[0];
    },
  };
  
   _.extend(Collection.prototype, options);
  
  return Collection;
}

function ViewConstructor(opts) {
  function View(model) {
    this.model = model;
    // Add a callback to the model so the model's view changes automatically when its data changes
    this.model.addCallBack(this.render.bind(this));
    // Make sure to remove the view when model got deleted by reassigning the model remove method
    this.model.__remove = this.remove.bind(this);
    // Add a pointer back to the view object-handy for later when changing the model
    this.model.view = this;
    this.attributes["data-id"] = this.model.id;
    this.$el = $("<" + this.tag_name + ">", this.attributes);
    this.render();
  }

  View.prototype = {
    tag_name: "div",
    template: function() {},
    attributes: {},
    events: {},
    render: function() {
      // make sure when a view is re-rendered the events are not duplicated
      this.unbindEvents();
      this.$el.html(this.template(this.model.attributes));
      this.bindEvents();
      // can be reached from outside of the app; enables us to reuse the view as a sub-view
      return this.$el;
    },
    // remove the entire parent element using jQuery remove() method
    remove: function() {
      this.unbindEvents();
      this.$el.remove();
    },
    bindEvents: function() {
      var $el = this.$el;
      var event, selector, parts;
      
      for (var prop in this.events) {
        parts = prop.split(" ");
        selector = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
        event = parts[0];
        if (selector) {
          $el.on(event + ".view", selector, this.events[prop]);
        } 
        else {
          $el.on(event + ".view", this.events[prop]);
        }
      }
    },
    unbindEvents: function() {
      // use the namespace ".view" to only unbind the events using viewConstructor
      this.$el.off(".view");
    },
  };

  _.extend(View.prototype, opts);

  return View;
}