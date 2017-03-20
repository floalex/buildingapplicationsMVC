// receive the grunt object
module.exports = function(grunt) {
  // configure plugins
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          "public/javascripts/vendor/all.js": ["public/javascripts/vendor/all.js"]
        }
      }
    },
    bower_concat: {
      all: {
        dest: "public/javascripts/vendor/all.js",
        dependencies: {
          "underscore": "jquery",
          "backbone": "underscore"
        }
      }
    }
  });
  
  // initialize plugins
  [
    "grunt-bower-concat",
    "grunt-contrib-uglify"
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });
  
  // make default task
  grunt.registerTask("default", ["bower_concat", "uglify"]);
};