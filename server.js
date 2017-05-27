
var fs = require('fs');
var https = require('https')
var http = require('http')

var sskey = fs.readFileSync('key.pem');
var sscert = fs.readFileSync('cert.pem')

var options = {
  key: sskey,
  cert: sscert,
  passphrase: 'shadman'
};

var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
// var multer = require('multer');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var social = require('./server/config/passport')(app, passport);
// const keyPublishable = process.env.PUBLISHABLE_KEY;
// const keySecret = process.env.SECRET_KEY;
// const stripe = require("stripe")(keySecret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));
app.use(express.static(__dirname + '/views'));
app.use(session({secret: 'password',
                  saveUninitialized: true,
                resave: true}));

app.use(passport.initialize())
app.use(passport.session());
app.use(flash());

app.set('views', path.join(__dirname, './views'));

app.set("view engine", "pug");
// app.set("view engine", "html")

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
require('./server/config/passport')
routes_setter(app, passport);


// https.createServer(options, app).listen(process.env.PORT || 8000, function() {
//   console.log("Smiota Store HTTPS at 8000");
// });

http.createServer(app).listen(process.env.PORT || 8000, function() {
    console.log(process.env.PORT);
};


//
// https.createServer(options, app).listen(process.env.PORT || 8000, function() {
//   console.log(process.env.PORT);
// })
// app.listen(8000, function() {
//  console.log("Smiota Store HTTP at port 8000");
// });
