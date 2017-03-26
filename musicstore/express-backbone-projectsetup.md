# 1. Set up Express and Backbone
* Set up Express application
  * run `express --view=pug myapp`
  * `npm install -D nodemon`; Add `start": "nodemon app.js` in package.json 
  * `npm install`
  * run `npm start` to verify if the nodemon is running
  * `npm install -S stylus`

* Set up Bower and Grunt
  - `bower init`
  - `bower install -S jquery backbone handlebars`
  - Install grunt plugins as dev dependencies: `npm install -D grunt`
  - `npm install -D grunt-bower-concat grunt-contrib-uglify`
  - `npm install -D grunt-contrib-handlebars grunt-contrib-watch`
  - Add 'Gruntfile.js' to the directory to set up grunt object and configure plugins
  - run `grunt` to make sure the plugins run
  - Set up JSON data, put the dat file in "/data" 

* Install jasmine-node locally
   - `npm install jasmine-node -S`
    - test HTTP: `npm install request -S`
    - place jasmine-node into integration files, add "test": "jasmine-node spec --autotest --color --watch ."
   - Add routes spec, run `npm start` and `npm test` to run the tests

* Create an index route
  - Use the path and fs modules built-in to Node to read in albums from the JSON file
    - To obtain the current root directory of your server, use `path.resolve(path.dirname(__dirname))`
  - Put the code in 'index.js' file in "/routes"
  - Modify the get "/" route by passing the albums JSON as data to be used by the Pug view.
    - `res.render('index', { albums: getAlbums() });`
  - Remove the unnecessary routes in app.js

# 2. Reading JSON file, sending to the Pug view, and setting up Stylus and writing the basic styles
* Create an index Pug view
  - Create a basic Pug layout.
  - Include the mixins `stylesheet_link_tag(src)`, `javascript_include_tag(src)`
  - Prevent error "the "basedir" option is required to use include and extends with "absolute" paths"
    - Add `app.locals.basedir = path.join(__dirname, 'views');` in "app.js"
  - Iterate over the albums JSON and output a list of albums with all data rendered.
    - `each object in arrayName`
    - Add an "add to cart" link to each album to be used later.

* Create some basic Stylus styles
  - Connect middleware
    - Add `app.use(stylus.middleware({ src: , compile: function }));` in "app.js"
    - Include nib as dependency: `npm install -S nib`
    - require stylus and nib in app.js
  - Create "application.styl" in "public/stylesheets" to start style
    - Move the cart link styles to a mixin in a separate file, then use an @import 
      directive to include it.
    - Move any CSS colors to a colors object in the mixins file, then change color 
      references to object properties on the colors object.

# 3. New Album Route and Form
* Create a new album form in Pug.
  - Add fields for all data properties.
  - Style the submit button the same as the add to cart button.
* Create an albums route file
  - Create a new file "albums.js" in "routes"
    - Get wire up by requiring path, fs, epxress module and router, and `path.resove`
    - Be sure to export the router at the end of the file
  - Create a get route for "/albums/new" and render the "new" view.
    - `router.get("/albums/new", function(req, res) { res.render("new")})`
    - Include the albums route in "app.js"(will clean up in "all.js" next)
      - `app.use('/', albums);`
      - `var albums = require('./routes/albums');`
* Create styles for the form.
  - Set form inputs to be 100% width and set their box-sizing to border-box. 
  - This ensures that they adjust to fit the width of the form element.
  
* Add an albums route for post to "/albums"
  - Create "all.js" in "routes" file, and put the routes there
    - Include express, router, path, etc. in "index.js" 
    - Require each path file list
    - Just require "all" in "app.js"
  - Clear out the existing JSON data in the albums.json file. Save the data to 
    a different file. It can be useful as source for sample starting data.
  - Convert the albums array to be a data property on a parent object. Add a 
    last_id property to the parent object, set to 0 to start with. You should 
    have something that looks like in data/albums.json:
      { "last_id": 0, "data": [...] }
  - Create a post route, then store `album` as `req.body` in "albums.js"
    - Set the newly created album's ID with `nextID()`
    - Increment last_id by 1 and add the new album object to the array of albums.
    - Save the JSON file using the `fs.writeFileSync` method, passing album.id and new album
    - Respond the JSON album object in the response. 
  - Attach `data` when return JSON in `getAlbums` in both "albums.js" and "index.js"

# 4. Add Album Node Module in "routes"
* Move the album JSON manipulation code to a Node module. Be sure to export module!
  - Create get and set methods:
    - `get` will get the albums data
    - `set` will set the next item's id, then write to the albums array
  - Create a getLastID method, which will simply return the last_id property.
  - Replace the code in both routes with the new albums module method calls. To 
    require the module, you'll need to use a similar method of building the relative 
    path using the path module as you did with reading the JSON file in.

* Create put and delete actions for the "/albums" route.
  - put:
  Use the Underscore Node module to locate the current album based on an ID 
  received from the request body.
  Overwrite properties from the request body on the current album. (with _.extend)
  Save the albums data with the set method.
  Send the updated current album back as JSON using the response object.
  - delete:
  Use the Underscore reject method to obtain all albums except the one with the 
  ID from req.params.
  Save the albums data with the set method.
  Send a status code of 200, then end the response using res.status(200).end().

# 5. Convert the views to Backbone and Handlebars
* Create App object and the Backbone constructors
  - Create a vanilla App object in "application.js" file.
  - Create a new Album model, Album view and Albums collection using Backbone. 
  - Add all javascript files in "layout.pug" in views with includ tag
  - Create `block scripts` to allow per-page inclusion of JavaScript files and inline code.   
  - Within the index view, set `App.albums` to a new Albums collection, populated 
    with the albums JSON data in the view. This will reduce HTTP request and make 
    the app faster. Use the scripts block to make sure this gets loaded at the bottom 
    of the page. To do this will require a combination of a block of text within 
    a tag and unescaped string interpolation.
 - Create a Backbone AlbumView to render an album model. 

* Convert the list item used to display an album into a Handlebars template and 
  precompile it using the Grunt Handlebars plugin
  - Create handlebars dir. Move the elements under `li` in "index" to "album.hbs"
  - Set up handlebars configuration in "Gruntfile" to complile scripts into one file
  - Run `grunt handlebars` to generate the JST file. Add the handlebars js file in "layout"
  - Set the App.templates property to JST. This allows to access `App.templates.album`
  - In `AlbumView`, add the template property with render and initialize method
  - Create a format_price Handlebars helper to format the price to two decimal places.
  - On App.init, call a method to renderAlbums.
    - Iterate over each album in the collection and create a new AlbumView.
  - Init the App in "index.pug"

# 6. Convert New Album View to Backbone Page
* Create a Backbone view for NewAlbumView, add the "add new album" button on the home page 
  - Add attributes property, render and initialize method in "NewAlbumView"
    - In the render method, replace the contents of the page with the new album form.
  - Create "new_album.hbs" and place the form codes from pug here. Delete the form in pug. 
    Don't forget to run `grunt handlebars` to complie the hbs file and include it in layout
  - On submit, send the form via AJAX. The returned data is added to the collection 
    so it gets rendered when the index view is rendered.

* Create Separate IndexView so we can render index page from Backbone
  - Create a Handlebars template for the index page. Add attributes property in "IndexView"
  - Add "click" event to add "addAlbum" method so clicking "Add new album" button 
    can render new album page
  - Create "bindEvents" in "App", extend Backbone.Events and listen to "indexView" there
  - Create the App.indexView method, creating a new IndexView and rendering it. 
  - Call renderAlbums in App.indexView after to repopulate the albums views.

* Create a Backbone router to navigate between the index and new album routes
  - Specify a route for "albums/new" to call App.newAlbum.
  - Specify a route in initialize using a regex for the index route (check for both 
    root paths with and without a "/") to call this.index.
  - Create the index method on router to call App.indexView.
  
* Start the Backbone history listener, with the pushState option set to true.
* Add a click event listener to the document that will use the Backbone router to 
  navigate to wherever the path of the anchor points to. Trigger pushState by passing
  `trigger: true` option in `router.navigate` method
* Move the output of the albums JSON data from the index view to the layout to 
  ensure the albums collection is created on entry page. No need to call `App.init` 
* Reorganize your JavaScript includes:
  - application, models, collections, views, App.albums creation, router
* In the "albums/new" route, add the albums data output in the response.render call.

* Add edit and delete button in index page. Create backbone views for both functions
  - remember to pass in id to edit album method
  - make sure the edit form method matched the backend method created previously
  - implement "back" button with href=# for history.back() to work

# 7. Adding a Cart
* Create a sample, static cart view
  - Create a header element with a #cart div in the Pug layout
  - Create styles for the cart.
* Create a Backbone collection constructor for CartItems. Do not set a model
* Add a click event to the cart buttons
* Create collection methods to calculate the cart total and quantity
* Add a condition to addItem to check for an existing model based on the ID of the model passed in
* Create a CartView constructor.
* Add the "cart_updated" event trigger in the addItem method on the cart collection
* Add a link to remove the model from the cart collection in the view.

# 8. Store and Retrieve Cart Data with localStorage
* Create methods to read from storage and update storage.
  - Read storage should parse the cart contents, then reset the collection with the data.
  - Writing to storage will write the array returned from the toJSON call to localStorage.
  - Call methods to update the total and quantity after reading data in.
* Call the read storage method on collection initialize.

## Note: When ever you make changes on any ".hbs" file, be sure to run `grunt handlebars` 