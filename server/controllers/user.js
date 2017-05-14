// console.log("serverside user controller");
var mongoose = require('mongoose');
// var http = require('http')
var User = mongoose.model('User');
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

addtocart: function(request, response){
  console.log(request.body.email);
  console.log(request.body.product);
  User.findOne({email: request.body.email}, function(err, user){
    if(err){
      console.log('err in add to cart');
      response.json(err);
    }
    else{
      // found the user and now lets add
      // could do logic to minus the quantity of slected from the prodcuts model to show a reserved but will need timeout for that
      var item = {item: request.body.product, quantity: request.body.quantity}
      // Check if the product is already in the cart
      for (var i = 0; i<= user.cart.length-1; i++){
        if(user.cart[i].item == request.body.product._id){
          console.log('this item is here');
          user.cart[i].quantity = item.quantity
        }
        else {
          console.log('this item is not here');
          user.cart.push(item)
        }
      }

      user.save(function(err){
        if(err){
          console.log(err);
          response.json(err);
        }
        else{
          console.log('done');
          // console.log(user.cart);
          response.json(user)
        }
      })
    }
  })

},

usercart: function(request, response) {
  User.findOne({email: request.body.email}
    .populate('cart')
    .exec(function(err, user) {
      if(err){
        console.log(err);
      }
      else{
        console.log(user);
      }
    })



  )}




  //
  // Story
  // .findOne({ title: 'Once upon a timex.' })
  // .populate('_creator')
  // .exec(function (err, story) {
  //   if (err) return handleError(err);
  //   console.log('The creator is %s', story._creator.name);
  //   // prints "The creator is Aaron"
  // });

//     function(err, user){
//     if(err){
//       console.log('err in usercart');
//       response.json(err);
//     }
//     else{
//       // found the user and now lets add
//       response.json(user)
// }






// }
// )}





// end of export
}
