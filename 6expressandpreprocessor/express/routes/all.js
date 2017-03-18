var express = require('express');
var router = express.Router();
// var _ = require("underscore");
var fs = require("fs");
var path = require("path");

// for set up project
// module.exports = function(app) {
//   function setActiveNavTo(title) {
//     // first hide the current active page
//     var active_item = _(app.locals.links).findWhere({ active: true});
//     // when first load the page, there is no active item
//     if (active_item) { active_item.active = false; }
//     // then set the particular page to true when redirect
//     _(app.locals.links).findWhere({title: title}).active = true;
//   }
  
//   /* GET home page. */
//   router.get('/', function(request, response, next) {
//     var title = "Home";    
//     setActiveNavTo(title);
    
//     // //Express can send it back to the client by using the sendFile method
//     // response.sendFile(__dirname.replace(/routes/, "views") + "/index.html");
    
//     // request contains info from users such as accessing form data
//     // response is what we will send back to the users
//     response.render('index', { 
//       title: title  
//     });
//   });
  
//   router.get('/about', function(request, response, next) {
//     var title = "About";
    
//     setActiveNavTo(title);
//     // request contains info from users such as accessing form data
//     // response is what we will send back to the users
//     response.render('about', { 
//       title: title   
//     });
//   });
  
//   return router;
// };

router.get('/', function(req, res, next) {
  var products = fs.readFileSync(path.resolve(path.dirname(__dirname), "public/products.json"), "utf8");
  res.render('index', { 
    products: JSON.parse(products)
  });
});

module.exports = router;
