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

* Set up JSON data
  - put the dat file in "/data" 

* Create an index route
  - Use the path and fs modules built-in to Node to read in albums from the JSON file
    - To obtain the current root directory of your server, use path.resolve(path.dirname(__dirname))
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

* New Album Route and Form
  - Create an albums route file.
    - Create a get route for "/albums/new" and render the "new" view.
  - Create a new album form in Pug.
    - Add fields for all data properties.
    - Style the submit button the same as the add to cart button.
  - Create styles for the form.
    - Set form inputs to be 100% width and set their box-sizing to border-box. 
    - This ensures that they adjust to fit the width of the form element.
  - Add an albums route for post to "/albums".
    - Read in req.body as the album data.
    - Clear out the existing JSON data in the albums.json file. Save the data to 
      a different file. It can be useful as source for sample starting data.
    - Convert the albums array to be a data property on a parent object. Add a 
      last_id property to the parent object, set to 0 to start with. You should 
      have something that looks like:
        {
          "last_id": 0,
          "data": []
        }
    - Read in the last ID and use it to set the newly created album's ID.
    - Increment last_id by 1 and add the new album object to the array of albums.
    - Save the JSON file using the fs Node module and the writeFileSync method.
    - Send back the JSON album object in the response.