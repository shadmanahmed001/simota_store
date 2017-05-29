// require mongoose
var mongoose = require('mongoose');
// require the fs module for loading model files
var fs = require('fs');
// require path for getting the models path
var path = require('path');

// mongoose.connect('mongodb://localhost/smiotastore', function()  {
//   console.log('at LOCALHOST DB');
// });
mongoose.connect('mongodb://heroku_xfr7nsnv:f57n3v8oisiv119csqav47u518@ds151141.mlab.com:51141/heroku_xfr7nsnv', function() {
  console.log('connected to mongo');
});


// create a variable that points to the path where all of the models live
var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});
