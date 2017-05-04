var mongoose = require('mongoose');
var products = require('../controllers/product')
var users = require('../controllers/user')

var path = require('path')
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);

module.exports = function(app){
app.get('/products', function(request, response) {
  products.index(request, response);
});
app.get('/edit/:id', function(request, response) {
  products.show(request, response);
});

// this is going to be the route for the admin add product page

app.get('/smiotastore/admin/addproduct', function(request, response){
  response.sendFile(path.join(__dirname,'../../views/addProductPage.html'))
});

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
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .catch(err => console.log("Error:", err))
  .then(charge => response.render("charge.pug"));
});

app.post('/user', function(request, response) {
  console.log("ji");
  console.log(response["signedInUser"]);
  users.verifyUser(request, response);
});

app.post('/products', function(request, response) {
  products.create(request, response);
});
app.put('/products/:id', function(request, response) {
  products.update(request, response);
});
app.delete('/products/:id', function(request, response) {
  products.delete(request, response);
});
}
