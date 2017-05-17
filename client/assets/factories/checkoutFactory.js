// console.log('checkoutFactory');
app.factory('checkoutFactory', ['$http', function($http) {
  var factory = {};

factory.getOrder = function(email, callback) {
  $http.post('/getorder', email).then(function(returned_data){
    console.log("getting order", returned_data.data);
    callback(returned_data.data);
  });
}

















  return factory;
}]);
