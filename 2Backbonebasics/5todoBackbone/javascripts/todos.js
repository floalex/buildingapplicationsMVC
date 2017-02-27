var App = {
  // it's better to scope in the parent element tp make sure we grab the correct el
  $el: $("main"),
  $todos: $("#todos"),
  newTodo: function(e) {
    e.preventDefault();
    var name = $(e.target).find("#todo_name").val();
    var model;
    var view;
    
    if (!name) { return; }
    
    model = this.Todos.add({
      name: name,
    });
    
    view = new this.TodoView({ model: model });
    view.$el.appendTo(this.$todos);
    
    e.target.reset();
  },
  clearCompleted: function(e) {
    e.preventDefault();
    var incomplete = this.Todos.where({ complete: false });
    console.log(incomplete);
    this.Todos.set(incomplete);
  },
  bindEvents: function() {
    this.$el.find("form").on("submit", this.newTodo.bind(this));
    this.$el.find("#clear").on("click", this.clearCompleted.bind(this));
  },
  init: function() {
    this.Todos = new TodoList();
    this.bindEvents();
  },
};

var templates = {};

$("script[type='text/x-handlebars']").each(function() {
  var $tmpl = $(this);
  templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
});

App.Todo = Backbone.Model.extend({
  idAttribute: "id",
  defaults: {
    title: '',
    complete: false
  },
  initialize: function() {
    this.collection.incrementID();
    this.set("id", this.collection.last_id);
  },
});

var TodoList = Backbone.Collection.extend({
  last_id: 0,
  model: App.Todo,
  incrementID: function() {
    this.last_id++;
  },
});

App.TodoView = Backbone.View.extend({
  tagName: "li",
  template: templates.todo,
  events: {
    "click": "editTodo",
    "click a.toggle": "toggleComplete",
  },
  render: function() {
    this.$el.attr("data-id", this.model.get("id"));
    this.$el.html(this.template(this.model.toJSON()));
  },
  editTodo: function(e) {
    // remove bound version of view in framework.js so that 'this' doesn't point to View
    var idx = Number($(e.target).attr("data-id"));
    var model = App.Todos.get(idx);
    var $edit_form = $(templates.todo_edit(model.toJSON()));
    
    this.$el.after($edit_form);
    this.$el.remove();
    
    $edit_form.find("input").focus();
    $edit_form.on("blur", "input", this.hideEdit.bind(this));
  },
  hideEdit: function(e) {
    // both e.target and e.currentTarget equal to [input, context: input]
    var $input = $(e.target);
    var name = $input.val();
    var $li = $input.closest("li");
 
    this.model.set("name", name);
    $li.after(this.$el);
    $li.remove();
    $input.off(e);
    this.delegateEvents();
  },
  toggleComplete: function(e) {
    var $li = $(e.target).closest("li");
    var idx = Number($li.attr("data-id"));
    var model = App.Todos.get(idx);
    
    model.set("complete", !model.get("complete"));
    $li.toggleClass("complete", model.get("complete"));
    console.log(App.Todos.toJSON());
    return false;
  },
  initialize: function() {
    this.render();
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "remove", this.remove);
  },
});

App.init();