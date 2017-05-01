var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = {
  index: function(request,response){
    Product.find({}, function(err, data){
      if (err){
        console.log('there was a problem here');
      }
      else{
        response.json(data)
      }
    })},
  create: function(request,response){
    console.log('got to the create function in server', request.body);
    var newproduct = new Product(request.body);
    console.log(newproduct);
    newproduct.save(function(err){
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
            response.json(data);
          }
        })
      }
    })
  },
  update: function(request,response){
      Product.update({_id: request.params.id},request.body, function(err) {
        if(err){
          console.log('Updating didnt work');
        }
        else{
          console.log('you updated');
          Product.findOne({_id: request.params.id}, function(err, product) {
            if (err){
              console.log('the show had an error');
              response.json(err);
            }
            else{
              response.json(product)
            }
      })  }
    })
  },

  delete: function(request,response){
    Product.remove({_id: request.params.id}, function(err){
      if(err){
        console.log('delete had an err');
        response.json(err)
      }
      else{
        console.log('The delete worked');
        response.json({placeholder:'deleted'});
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
}
