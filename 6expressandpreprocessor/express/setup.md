# Express Setup

## http://expressjs.com/en/starter/generator.html
1. Install express globally
    - npm install express-generator -g

2. Create an app in working directory
    - run 'express --view=pug myapp'(if with jade, run 'express myapp')
    - install dependencies 'npm install'

3. Install nodemon so no need to restart server when making changes
    - npm install -D nodemon
    - change "start" under "scripts" to "nodemon" from "node"

4. Install stylus 
    - npm install -S stylus

5. Install nib to enable using stylus
    - npm install -S nib
    - require both stylus and nib in app.js file
      - `var stylus = require("stylus");`
      - `var nib = require("nib");`
      - `app.use(stylus.middleware({`
          `src: path.join(__dirname, "public"),`
          `compile: function(str, path) {`
            `return stylus(str).set("filename", path).use(nib());`
          `}`
        `}));`