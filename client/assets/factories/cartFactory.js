
app.factory('cartFactory', ['$http', function($http) {
  var factory = {};


  factory.usercart = function(email, callback) {
      $http.post('/usercart', email).then(function(returned_data){
        console.log("getting logged in user cart", returned_data.data);
        callback(returned_data.data);
      });
  }

  factory.editCart = function(emailWithCartIdAndUpdatedQuantity, callback) {
    console.log(emailWithCartIdAndUpdatedQuantity);
    $http.post('/addtocart', emailWithCartIdAndUpdatedQuantity).then(function(returned_data){
      console.log("getting updated cart", returned_data.data);
      callback(returned_data.data);
    });
  }

  factory.deleteFromCart = function(emailWithCartId, callback){
    $http.post('/deletefromcart', emailWithCartId).then(function(returned_data){
      console.log("from delete fac", returned_data.data);
      callback(returned_data.data);
    });
  }

  factory.makeOrder = function(user, callback) {
    $http.post('/createorder', user).then(function(returned_data){
      console.log("makeOrder fac", returned_data.data);
      callback(returned_data.data);
    });
  }

  factory.applePay = function(token) {
    console.log('printiiing');
    console.log(token);
    $http.post('/applepay', token).then(function(returned_data) {
      console.log('returned data from AP', returned_data);
      console.log('should you have a callback?');
    })
  }

//   factory.show = function($routeParams, callback) {
//     $http.get('/edit/'+$routeParams ).then(function(response){
//       if(typeof callback === 'function'){
//         callback(response.data);
//       }
//     })
//   }
//   factory.create = function(newProduct, callback) {
//       $http.post('/products', newProduct).then(function(returned_data){
//         console.log('this is the retun',  returned_data.data);
//         if (typeof(callback) == 'function'){
//           callback(returned_data.data);
//         }
//       });
//   }
//   factory.update = function(product, callback) {
//     $http.put('/products/'+ product._id, product).then(function(returned_data) {
//         console.log(returned_data.data);
//         if (typeof(callback) == 'function'){
//           callback(returned_data.data);
//         }
//     })
//   }
//   factory.delete = function(product, callback) {
//     $http.delete('/products/'+product._id).then(function(response) {
//             console.log(response.data);
//             if (typeof callback === 'function') {
//               callback(response.data);
//             }
//           })
//   }
//
//
//   // ******************************************
//             // CART
// // ******************************************
// factory.addToCart =  function(userEmailWithProductQuantity, callback) {
//   console.log(userEmailWithProductQuantity);
//   $http.post('/addtocart', userEmailWithProductQuantity).then(function(returned_data) {
//       console.log('this is from addtocart func', returned_data.data);
//       if(typeof(callback) == 'function'){
//         callback(returned_data.data)
//       }
//   })
// }



















  return factory;
}]);
