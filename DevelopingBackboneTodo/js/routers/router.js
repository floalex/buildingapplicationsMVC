// Todo Router
// ----------
// When the route changes, the todo list will be filtered on a model level and the selected 
// class on the filter links in the footer will be toggled as described above. When an item 
// is updated while a filter is active it will be updated accordingly (e.g., if the filter 
// is active and the item is checked, it will be hidden). The active filter is persisted on reload.

var app = app || {};

var Workspace = Backbone.Router.extend({
  routes:{
    '*filter': 'setFilter'
  },

  setFilter: function( param ) {
    // Set the current filter to be used
    if (param) {
      param = param.trim();
    }
    app.TodoFilter = param || '';

    // Trigger a collection filter event, causing hiding/unhiding
    // of Todo view items
    app.Todos.trigger('filter');
  }
});

app.TodoRouter = new Workspace();
Backbone.history.start();