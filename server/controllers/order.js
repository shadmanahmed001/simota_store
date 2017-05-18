// console.log('orders js started');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Order = mongoose.model('Orders')

module.exports = {

createorder: function(request, response) {
  console.log(request.body);
  var newOrder = new Order()
  console.log('just created new order',newOrder);
  newOrder.user = request.body._id;
  // newOrder.products = request.body.cart
  console.log('this is request.body.cart', request.body.cart);
  // forloop
  for(var i = 0; i < request.body.cart.length; i++){
    console.log('hi');
    var x = {item: request.body.cart[i].item._id, quantityBought: request.body.cart[i].quantity }
    newOrder.products.push(x)
  }
  console.log('NEWORDER');
  console.log('changed',newOrder);
  // SAVE ORDER
  // CHECK IF ANY ORDER ACTIVE- IF ACTIVE THEN CHANGE EXISTING ORDER OR ELSE CREATE ORDER
  newOrder.save(function(err) {
    if(err){
      console.log(err);
      response.json(err)
    }
    else {
      console.log('this is the new order', newOrder);
      response.json(newOrder)
    }
  })

// DO THIS AFTER THE ORDER PAGE
// change the quantity ordered from total in product

// THEN EMPTY MY CART




},

getOrder: function(request, response) {
  console.log(request.body.email);
  // get the user the pop then look up the order with the id
  User.findOne({email: request.body.email}).populate('cart.item').exec(function(err, user) {
    if(err){
      console.log('ohhh weee error', err);
      response.json(err)
    }
    else {
      console.log('got user', user.cart);
      // now look up the orders with the user id
      Order.find({user: user._id}).populate('products.item').populate('user').exec(function(err, order) {
        if (err){
          console.log('err', err);
          response.json(err)
        }
        else {
          console.log('got order', order);
          // validation if the order exists then delete it
          response.json(order[0])
        }
      })
    }
    })
  },






//
// show: function(request,response){
//   Product.findOne({_id: request.params.id}, function(err, product) {
//     if (err){
//       console.log('the show had an error');
//       response.json(err);
//     }
//     else{
//       response.json(product)
//     }
// })  }




// end of export
}
