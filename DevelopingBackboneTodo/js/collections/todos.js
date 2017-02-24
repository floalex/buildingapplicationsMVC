 var app = app || {};

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model by specify the model class that the collection contains
    // the model type used by collection.create() to instantiate new model in the collection
    model: app.Todo,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    // https://github.com/jeromegn/Backbone.localStorage
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // Filter down the list of all todo items that are finished.
    completed: function() {
      return this.filter(function( todo ) {
        return todo.get('completed');
      });
    },

    // Filter down the list to only todo items that are still not finished.
    remaining: function() {
      return this.without.apply( this, this.completed() );
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function( todo ) {
      return todo.get('order');
    }
    
    // Note: this.filter, this.without and this.last are Underscore methods that 
    // are mixed in to Backbone.Collection 
  });

  // Create our global collection of **Todos**.
  app.Todos = new TodoList();