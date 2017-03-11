var Album = Backbone.Model.extend({
  // parse callback has to return the data for backbone to set the initial attributes 
  // and values on the model
  parse: function(attrs) { // current attributes
    // Set the new property on the current JSON object to new value
    attrs.tracks_url = "/albums/" + attrs.title;  
    return attrs;
  },
});