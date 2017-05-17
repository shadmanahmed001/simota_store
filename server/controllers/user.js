// console.log("serverside user controller");
var mongoose = require('mongoose');
var Promise = require("bluebird");

// var http = require('http')
var User = mongoose.model('User');
var Product = mongoose.model('Product')
var Cart = mongoose.model('Cart')
// var GoogleAuth = require('google-auth-library');
// var auth = new GoogleAuth;
// var client = new auth.OAuth2("689577300744-g8rvm6bf9qijn39oqe6l3ofod5njmprc.apps.googleusercontent.com", '', '');

module.exports = {
  // Making Admin and Manager accounts
  //   createAdminUser: function(){
  //   User.findOne({email:"a@admin.com"}, function (err, user) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (!user) {
  //       console.log("Admin Not Found! Creating one at email: a@admin.com pass: asdf");
  //       var newAdmin = new User({
  //         username: 'Smiota Admin',
  //         email: 'admin@smiota.com',
  //         password: 'asdf',
  //       });
  //       newAdmin.save(function (err, user) {
  //         if (err) {
  //           console.log("Email already Registered");
  //           error_messages.push("Email Already Registered! Please Login.");
  //           res.json({success: false, error_messages: error_messages});
  //           console.log(err);
  //           throw err;
  //         }
  //       });
  //     } else {
  //       console.log("Admin Available @ email: a@admin.com pass: asdf");
  //     }
  //   });
  //
  //   User.findOne({email:"a@manager.com"}, function (err, user) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (!user) {
  //       console.log("Manager Not Found! Creating one at email: aa@manager.com pass: asdf");
  //       var newAdmin = new User({
  //         first_name: 'admin',
  //         last_name: 'admin',
  //         email: 'aa@admin.com',
  //         phone_number: '5106009412',
  //         password: 'asdf',
  //         admin: 1
  //       });
  //       newAdmin.save(function (err, user) {
  //         if (err) {
  //           console.log("Email already Registered");
  //           error_messages.push("Email Already Registered! Please Login.");
  //           res.json({success: false, error_messages: error_messages});
  //           console.log(err);
  //           throw err;
  //         }
  //       });
  //     } else {
  //       console.log("Manager Available @ email: aa@manager.com pass: asdf");
  //     }
  //   });
  // },

  // End of creating Admin and Manager


  create: function(request,response){
    console.log('got to the create function in server', request.body);
    var newProduct = new Product();
    newProduct.name = request.body.name;
    newProduct.description = request.body.description
    newProduct.image = request.body.image
    newProduct.price = request.body.price
    newProduct.others_price = request.body.others_price
    if(request.body.quantity){
      newProduct.quantity = request.body.quantity
    }
    console.log("the product made is", newProduct);
    newProduct.save(function(err){
      if (err){
        console.log('error in creation');
        response.json(err);
      }
      else{
        console.log('created');
        Product.find({}, function(err, data){
          if (err){
            console.log('there was a problem here');
          }
          else{
            console.log('your sending all the products json');
            response.redirect('smiotastore/admin/addproduct');
          }
        })
      }
    })
  },
  show: function(request,response){
    Product.findOne({_id: request.params.id}, function(err, product) {
      if (err){
        console.log('the show had an error');
        response.json(err);
      }
      else{
        response.json(product)
      }
    })  },
  // update: function(request,response){
  //     Product.update({_id: request.params.id},request.body, function(err) {
  //       if(err){
  //         console.log('Updating didnt work');
  //       }
  //       else{
  //         console.log('you updated');
  //         Product.findOne({_id: request.params.id}, function(err, product) {
  //           if (err){
  //             console.log('the show had an error');
  //             response.json(err);
  //           }
  //           else{
  //             response.json(product)
  //           }
  //     })  }
  //   })
  // },
  //
  // delete: function(request,response){
  //   Product.remove({_id: request.params.id}, function(err){
  //     if(err){
  //       console.log('delete had an err');
  //       response.json(err)
  //     }
  //     else{
  //       console.log('The delete worked');
  //       response.json({placeholder:'deleted'});
  //     }
  //   })
  // },

// Adding Items and Editing Item in the Cart
addtocart: function(request, response){
  User.findOne({email: request.body.email}, function(err, user){
    if(err){
      console.log('err in add to cart', err);
      response.json(err);
    }
    else{
      var item = {item: request.body.product._id, quantity: request.body.quantity}
      console.log('this is the user', user);

      var toggle = true;
      if (user.cart.length == 0){
        console.log('there are no items in cart');
        user.cart.push(item);
        toggle = false;
        user.save(function(err){
          console.log('addin now');
          if(err){
            console.log(err);
            response.json(err);
          }
          else{
            console.log('no erros');
            // console.log('this is the updated user',user);
            response.json(user)
          }
        })
      }
      else if (user.cart != 0) {
        for (var i = 0; i < user.cart.length; i++) {
          if (user.cart[i].item == item.item) {
            console.log('found same item in cart');
            user.cart[i].quantity = item.quantity;
            toggle = false;
            user.save(function(err){
              console.log('changing now');
              if(err){
                console.log(err);
                response.json(err);
              }
              else{
                console.log('no erros');
                // console.log('this is the updated user',user);
                console.log('this is the user after find same item', user);
                response.json(user)
              }
            })
          }
        }
        if (toggle) {
          console.log('new item in the cart');
          user.cart.push(item);
          user.save(function(err){
            if(err){
              console.log(err);
              response.json(err);
            }
            else{
              console.log('no erros');
              // console.log('this is the updated user',user);
              response.json(user)
            }
          })
          console.log('saved the user and this is the cart:', user);
        }
      }
    }
  })
},

// Getting the cart items from the user
usercart: function(request, response) {
User.findOne({email: request.body.email}).populate('cart.item').exec(function(err, user) {
  if(err){
    console.log('ohhh weee error', err);
    response.json(err)
  }
  else{
    console.log('got all user cart items');
    response.json(user)
  }
  })
},

// Deleting from the cart
deletefromcart: function(request, response) {
  User.findOne({email: request.body.email}).populate('cart.item').exec(function(err, user) {
    if(err){
      console.log('err oh crap', err);
      response.json(err);
    }
    else{
      for (var i = 0; i < user.cart.length; i++) {
        console.log(user.cart[i]._id);
        if (user.cart[i]._id == request.body.cartId) {
          user.cart.splice(i,1)
          user.save(function(err){
            if(err){
              console.log(err);
              response.json(err);
            }
            else{
              console.log('no errors');
              response.json(user)
            }
          })
        }
      }
    }
  })
}











// end of export
}
