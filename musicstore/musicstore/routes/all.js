var express = require('express');
var router = express.Router();
var path = require('path');
var path_files = ["index", "albums"];

for (var i = 0; i < path_files.length; i++) {
  require(path.resolve(path.dirname(__dirname), "routes/" + path_files[i]))(router);
}

module.exports = router;
