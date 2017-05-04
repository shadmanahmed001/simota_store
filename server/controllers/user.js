console.log("serverside user controller");
var mongoose = require('mongoose');
var http = require('http')
var User = mongoose.model('User');
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2("689577300744-g8rvm6bf9qijn39oqe6l3ofod5njmprc.apps.googleusercontent.com", '', '');

module.exports = {
  // index: function(request,response){
  //   Product.find({}, function(err, data){
  //     if (err){
  //       console.log('there was a problem here');
  //     }
  //     else{
  //       response.json(data)
  //     }
  //   })},

  verifyUser: function(request,response){
  //   console.log(response["xhr"]);
  //   console.log("got here");
  //   client.verifyIdToken(
  //     "token",
  //     "689577300744-g8rvm6bf9qijn39oqe6l3ofod5njmprc.apps.googleusercontent.com",
  //     function (e, login) {
  //       var payload = login.getPayload();
  //       var userid = payload['sub'];
      // }
  //   )
    // trying to post to google api to verifyIdToken
    // An object of options to indicate where to post to
    console.log(response.id_token);
  // var post_options = {
  //     host: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + ,
  //     port: '80',
  //     path: '/compile',
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Content-Length': Buffer.byteLength(post_data)
  //     }
  // };

  // Set up the request
  // var post_req = http.request(post_options, function(res) {
  //     res.setEncoding('utf8');
  //     res.on('data', function (chunk) {
  //         console.log('Response: ' + chunk);
  //     });
  // });

  // post the data
  // post_req.write(post_data);
  // post_req.end();


  },


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
    })  }
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
}
