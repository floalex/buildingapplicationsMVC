## Setup Steps 
1. Run 'npm init' to create package.json
   - setup name, description, etc.

2. Install static files and save it to the package.json file as a dependency
    -npm install node-static -S

3. Install nodemon to avoid restarting the server when making changes
   - Add "start": "nodemon app.js", in "scripts" in package.json file

4. Install jasmine-node locally
   - npm install jasmine-node -S
    - test HTTP
      - npm install request -S
   - place jasmine-node into integration files
   - `npm test` to run the tests

5. Install and configuring Bower, Grunt, and the JS dependencies
   - npm install -S grunt grunt-contrib-uglify grunt-bower-concat
   - create Gruntfile.js
      - create module in the Gurntfile to add plugins
   - run 'bower init' to create bower.json file
   - run 'bower install -S jquery backbone'
   - run 'grunt' for the plugins work 

6. Install Handlebars
  - run 'bower install -S handlebars'
  - run 'grunt' to include handlebars 