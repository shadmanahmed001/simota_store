// console.log('STRIPE controller');
var Order = require('./order')

module.exports = {

applepay: function(request, response){
  console.log(request.body.appleToken);
  console.log(request.body.amount);

// console.log(request.body.tokenAmount);
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");


var token = request.body.appleToken; //
var charge = stripe.charges.create({
  amount: Number(request.body.amount * 100),
  currency: "usd",
  description: "Smiota Store | Workday",
  source: token,
}, function(err, charge) {
  if (charge){
    console.log('success');
    response.json({"success": true})
    return Order.makeorder(request, response)

    // return stripe.done(charge)
  }
  else {
    console.log('error');
    console.log(err);
    return response.json({"error": false})

  }
});
}


}
