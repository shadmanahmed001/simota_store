
app.factory('productsFactory', ['$http', function($http) {
  var factory = {};
  factory.index = function(callback) {
      //call this method if you want to update or set the products variable
      $http.get('/products').then(function(returned_data){
        console.log(returned_data.data);
        callback(returned_data.data);
      });
  }
  factory.show = function($routeParams, callback) {
    $http.get('/edit/'+$routeParams ).then(function(response){
      if(typeof callback === 'function'){
        callback(response.data);
      }
    })
  }
  factory.create = function(newProduct, callback) {
      $http.post('/products', newProduct).then(function(returned_data){
        console.log('this is the retun',  returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
  }
  factory.update = function(product, callback) {
    $http.put('/products/'+ product._id, product).then(function(returned_data) {
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
    })
  }
  factory.delete = function(product, callback) {
    $http.delete('/products/'+product._id).then(function(response) {
            console.log(response.data);
            if (typeof callback === 'function') {
              callback(response.data);
            }
          })
  }
  return factory;
}]);
