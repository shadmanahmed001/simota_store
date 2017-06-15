// console.log('managerController');
app.controller('managerController', ['$scope', 'ordersFactory', '$routeParams','$location', '$cookieStore', '$http', function($scope, ordersFactory, $routeParams, $location, $cookieStore, $http){

$scope.username = $cookieStore.get('username')
var email = $cookieStore.get('email')

// cartFactory.usercart({"email": email}, function(data) {
// $scope.user = data;
// $scope.cart = data.cart
// console.log('this is the user cart is',$scope.cart);
// });


  var CheckingUser = function () {
  if (!window.localStorage.token) {
    console.log("Not Logged In");
    $location.path('/');
  } else {
    // console.log($cookieStore.get('email'));
    // console.log(window.localStorage.token);
    console.log("logged in");
    // $location.path('/all')
  }
};
// CheckingUser();

  // $scope.counter = [];

// ordersFactory.orderdetails(324234, function(returned_data){
//   console.log('yay', returned_data);
// })


$http.get('/managergetallopen').then(function(returned_data) {
  console.log('this is all orders that are not pickedup', returned_data.data);
  $scope.openOrders = returned_data.data
})

if($routeParams.id){
  console.log($routeParams.id);
  $http.get('stockorder' + $routeParams.id).then(function(returned_data) {
    console.log(returned_data);
  })
}


// ordersFactory.getOrder({"email": email}, function(data) {
//   console.log('USER ORDERS',data);
//   $scope.order = data;
//   $scope.object = [];
//   for (var i = 0; i < data.length; i++){
//     var sum = 0;
//     for ( var k = 0; k < data[i].products.length; k++){
//       sum = sum + data[i].products[k].quantityBought
//     }
//     $scope.object.push({"data": data[i], "value": sum })
//   }
// });

// Order Details Page
// if ($routeParams.id){
  // console.log($routeParams.id);
//   ordersFactory.orderdetails($routeParams.id, function(data){
//     console.log('CURRENT ORDER details', data.data);
//     $scope.details = data.data
//     $scope.products = data.data.products
//     var total = 0;
//     for (var i = 0; i < data.data.products.length; i++){
//       total = total + data.data.products[i].item.price
//     }
//     $scope.total = total
//   })
// }
// else {
//   ordersFactory.getOrder({"email": email}, function(data) {
//     console.log('USER ORDERS',data);
//     $scope.order = data;
//     $scope.object = [];
//     for (var i = 0; i < data.length; i++){
//       var sum = 0;
//       for ( var k = 0; k < data[i].products.length; k++){
//         sum = sum + data[i].products[k].quantityBought
//       }
//       $scope.object.push({"data": data[i], "value": sum })
//     }
//   });
//
// }





// jQuery
$(".button-collapse").sideNav();

$('ul.tabs').tabs();

$(".searchToggle").click(function() {
  $("#searchDiv").slideToggle( "slow" );
});



}])
