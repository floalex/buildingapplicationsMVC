var Albums = Backbone.Collection.extend({
  model: Album,
  // Enable url "/albums/:id" for each Album's model
  url: "/albums"
});