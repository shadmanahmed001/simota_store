// console.log('ordersFactory');
app.factory('ordersFactory', ['$http', function($http) {
  var factory = {};

factory.getOrder = function(email, callback) {
  $http.post('/getorder', email).then(function(returned_data){
    // console.log("getting order", returned_data.data);
    callback(returned_data.data);
  });
}


factory.orderdetails = function(orderID, callback) {
  $http.get('/orderdetails/'+ orderID).then(function(returned_data) {
    // console.log('got the details', returned_data);
    callback(returned_data)
  })
}














  return factory;
}]);
