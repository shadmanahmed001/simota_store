var mongoose = require('mongoose');
var products = require('../controllers/product')
var users = require('../controllers/user')
var orders = require('../controllers/order')
var adminUser = require('../controllers/adminUser')
// var passport = require('./passport')
var passport = require('passport');
var jwt = require('jsonwebtoken');
var secret = 'shadman';


var path = require('path')

// Making the Admin and Manager Accounts
// adminUser.createAdminUser();


const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

// const stripe = require("stripe")(keySecret);

module.exports = function(app){

app.get('/products', function(request, response) {
  products.index(request, response);
});
app.get('/edit/:id', function(request, response) {
  products.show(request, response);
});

app.post('/charges', function(request,response){
  console.log('here at server');
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
  var token = request.body.token;
  var chargeAmount = request.body.amount * 100;
  // Charge the user's card:
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "usd",
    description: "Smiota Store Workday",
    source: token,
  }, function(err, charge) {

    // asynchronously called
  });

})

// this is where the stripe get method is going to go
// need to send it to json so angualr has the info
app.get("/checkout", function(request, response){
  response.render("index.pug", {keyPublishable})
});
// then add the charge method using the code there
app.post("/charge", function(request, response){
  let amount = 500;

  stripe.customers.create({
    email: request.body.stripeEmail,
    card: request.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Smiota Store Workday",
      currency: "usd",
      customer: customer.id
    }))
  .catch(err => console.log("Error:", err))
  .then(charge => response.render("charge.pug"));

});

// app.post('/user', function(request, response) {
//   console.log("ji");
//   console.log(response["signedInUser"]);
//   users.verifyUser(request, response);
// });



app.get('/logout', function(request, response){
  request.logout();
  response.redirect('/')
})


// End of Facebook
app.post('/products', function(request, response) {
  products.create(request, response);
});
app.put('/products/:id', function(request, response) {
  products.update(request, response);
});
app.delete('/products/:id', function(request, response) {
  products.delete(request, response);
});


//This is the redirect to set token page
app.get('/mainpage/:id', function(request, response) {
  console.log("hello at teh routhe paret");
  return response.redirect('/#!/mainpage/' + request.params.id)
});

// This is to verify the token and send the email and name
app.use(function(request, response, next) {

  var token = request.body.token || request.body.query || request.headers['x-access-token'];

  if (token){
    // verify token
    jwt.verify(token, secret, function(err, decoded) {
      if (err){
        response.json({success: false, message: 'Token Invalid'});
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    response.json({success: false, message: 'No token provided'});
  }
});

app.post('/verifytoken', function(request, response){
  console.log('inside the server verifytoken func');
  response.send(request.decoded);
});

// ******************************************
          // CART
// ******************************************

app.post('/addtocart', function(request, response) {
  users.addtocart(request, response);
})

app.post('/usercart', function(request, response){
  users.usercart(request, response)
})

app.post('/deletefromcart', function(request, response) {
  users.deletefromcart(request, response)
})

app.post('/createorder', function(request, response) {
  orders.createorder(request, response)
})

app.post('/getorder', function(request, response) {
  orders.getOrder(request, response)
})



}
