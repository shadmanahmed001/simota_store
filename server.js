
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

// const keyPublishable = process.env.PUBLISHABLE_KEY;
// const keySecret = process.env.SECRET_KEY;
// const stripe = require("stripe")(keySecret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.set('views', path.join(__dirname, './views'));

app.set("view engine", "pug");





// ************
app.use(express.static('bower_components'))
app.use(bodyParser.json())

// app.use(multer( {dest: './uploads/',
//   rename: function (fieldname, filename){
//     return filename;
//   },
// }));

require(path.join(__dirname,'./server/config/mongoose.js'));
var routes_setter = require(path.join(__dirname,'./server/config/routes.js'));
routes_setter(app);


app.listen(8000, function() {
 console.log("Simota Store is listening on port 8000");
});
