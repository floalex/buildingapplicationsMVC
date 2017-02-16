$(function() {
  var events_template = Handlebars.compile($("#events").html());
  var event_template = Handlebars.compile($("#event").html());
  
  Handlebars.registerPartial("event", $("#event").html());
  
  var Events = {
    collection: [],
    $el: $("#events_list"),
    add: function(events) {
      events = _.isArray(events) ? events : [events];      
      var self = this;
      events.forEach(function(event) {
        self.collection.push(event);
      });
      
      self.sortEvents();
      self.render();
    },
    sortEvents: function() {
      this.collection.sort(this.compareTime);
    },
    compareTime: function(a, b) {
      return a.date - b.date;
    },
    render: function() {
      this.$el.html(events_template({events: this.collection}));
    },
    remove: function(idx) {
      var model = _(this.collection).findWhere({id: idx});
      var position = this.collection.indexOf(model);
      this.collection.splice(position, 1);
      this.render();
    },
  };
  
  Events.$el.on("click", "a.remove", function(e) {
    e.preventDefault();
    var idx = Number($(e.target).closest("li").attr("data-id"));
    
    Events.remove(idx);
    
    $.ajax({
      url: "/events/delete",
      type: "post",
      data: "id=" + idx
    });
  });
  
  $("form").on("submit", function(e) {
    e.preventDefault();
    var $f = $(this);
    
    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: $f.serialize(),
      success: function(event) {
        Events.add(event);
      },
    });
  });
  
  $.ajax({
    url: "/events",
    success: function(events) {
      Events.add(events);
    },
  });
});