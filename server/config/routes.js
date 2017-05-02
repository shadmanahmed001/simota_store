var mongoose = require('mongoose');
var products = require('../controllers/product')
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
