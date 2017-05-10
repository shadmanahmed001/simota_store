app.factory('adminFactory', ['$http', function($http){
  var factory ={};

  factory.index = function(callback){
    $http.get('/products').then(function(returned_data){
      console.log("logging from admin controller index method", returned_data.data);
      callback(returned_data.data);
    });


    factory.show = function($routeParams, callback) {
      $http.get('/edit/'+$routeParams ).then(function(response){
        if(typeof callback === 'function'){
          callback(response.data);
        }
      })
    };


  factory.delete = function(product, callback) {
    $http.delete('/products/'+product._id).then(function(response) {
            console.log(response.data);
            if (typeof callback === 'function') {
              callback(response.data);
            }
          })
    };

    factory.update = function(product, callback) {
      $http.put('/products/'+ product._id, product).then(function(returned_data) {
          console.log(returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }
      })
    };

    factory.create = function(newProduct, callback) {
        $http.post('/products', newProduct).then(function(returned_data){
          console.log('this is the retun',  returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }
        });
    }


  }

  return factory;
}])
