// Globally disable all animations.
// jQuery.fx.off = true;

// describe("Tracks view", function() {
//   var album = albums_scaffold.findWhere({ title: 'Unbreakable Smile (Bonus Track Version)' });
//   beforeEach(function() {
//     this.view = new TracksView({ collection: tracks_scaffold, album: album });
//   });
  
//   // remove the the view after tests
//   afterEach(function() {
//     this.view.remove();
//   });
  
//   it ("has a collection property assigned", function() {
//     expect(this.view.collection).toBeDefined();
//     expect(this.view.collection.length).toBe(tracks_scaffold.length);
//   });
  
//   it ("has a Handlebars template compiled", function() {
//     expect(this.view.template).toBeDefined();
//   });
  
//   it ("renders a modal to the body when render called", function() {
//     this.view.render();
//     expect($("#tracks_modal li").length).toBe(tracks_scaffold.length);
//   });
  
//   it ("removes the view when fadeOut called", function() {
//     this.view.fadeOut();
//     expect($("#tracks_modal").length).toBe(0);
//   });
// });