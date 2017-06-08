// console.log('orders js started');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Order = mongoose.model('Orders')
var Product = mongoose.model('Product')


module.exports = {

// After the apple pay
makeorder: function(request, response) {
  var newOrder = new Order()
  User.findOne({email: request.decoded.email}, function(err, user){
    if(err){
      console.log('err in making order after apple pay', err);
      response.json(err);
    }
    else {
    newOrder.user = user._id;
    for (var i = 0; i < user.cart.length; i++){
      // console.log('in for');
      // console.log(user.cart[i]);
      // console.log(user.cart[i].id);
      // console.log(user.cart[i].item);
      //
      // return
      var x = {item: user.cart[i].item, quantityBought: user.cart[i].quantity }
      newOrder.products.push(x)
    }
    // console.log('neworder', newOrder);
  }
  newOrder.save(function(err) {
    if(err){
      console.log(err);
      // response.json(err)
    }
    else {
      console.log('this is the new order', newOrder);
      // response.json(newOrder)
      // minus products
      for (var i = 0; i < newOrder.products.length; i++){
        // console.log('inside the for', newOrder.products[i]._id);
        var id = newOrder.products[i].item
        // console.log('new order prod',id);
        // return
        Product.findOne({_id: id}, function(err, product){
          if (err){
            console.log('err');
          }
          else {
            console.log('yay');
            console.log(product);
            // TODO: MINUS THE quantityBought AND SAVE
          }
        })

      }
    }
  })
  return
  console.log('this is the user',user);
  user.cart = []
  console.log('user now', user);
  // save user
  user.save(function(err) {
    if(err){
      console.log(err);
      return response.json(err)
    }
    else {
      console.log('this is the new user', user);
      return response.json(user)
    }
  })
})
},



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
  // console.log(request.body.email);
  // get the user the pop then look up the order with the id
  User.findOne({email: request.decoded.email}).populate('cart.item').exec(function(err, user) {
    if(err){
      console.log('ohhh weee error', err);
      response.json(err)
    }
    else {
      // console.log('got user', user.cart);
      // now look up the orders with the user id
      Order.find({user: user._id}).populate('products.item').populate('user').exec(function(err, order) {
        if (err){
          console.log('err', err);
          response.json(err)
        }
        else {
          // if more than one order instance the clear them
          // else if only one instance then send taht one instance
          // console.log('got order', order);
          // validation if the order exists then delete it
          // console.log('************');
          // console.log(order[order.length-1]);

          return response.json(order)
        }
      })
    }
    })
  },


orderdetails: function(request, response) {
  console.log(request.params.id);
  Order.find({_id: request.params.id}).populate('products.item._id').exec(function(err, order) {
    if(err){
      console.log('error in orderdetails',err);
    }
    else {
      console.log('order details', order);
      return response.json(order)
    }
  })

}



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
