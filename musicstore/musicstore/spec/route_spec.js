// need to start the server to test
var request = require('request');
var root = "https://ls-javascript-floalex.c9users.io/";

// describe("Add New Route", function() {
//   var new_form = {
//     title: "title",
//     artist: "artist",
//     date: "2010-1-1",
//     cover: "https://placehold.it/170x170",
//     price: "12"
//   };
  
//   it("returns an object with the albums properties", function(done) {
//     request.post(root + "albums", {form: new_form}, function(error, response, body) {
//       var data = JSON.parse(body);
      
//       expect(typeof data.id).toBe("number");
//       expect(data.artist).toBe(new_form.artist);
//       expect(data.date).toBe(new_form.date);
//       expect(data.price).toBe(new_form.price);
//       expect(data.cover).toBe(new_form.cover);
//       done();
//     });
//   });
// });