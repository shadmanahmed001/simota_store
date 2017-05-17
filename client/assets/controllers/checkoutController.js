console.log('checkoutController');
app.controller('checkoutController', ['$scope', 'checkoutFactory', '$routeParams','$location', '$cookieStore', function($scope, checkoutFactory, $routeParams, $location, $cookieStore){

$scope.username = $cookieStore.get('username')
var email = $cookieStore.get('email')

// cartFactory.usercart({"email": email}, function(data) {
// $scope.user = data;
// $scope.cart = data.cart
// console.log('this is the user cart is',$scope.cart);
// });


  var CheckingUser = function () {
  if (!$cookieStore.get('email')) {
    console.log("Not Logged In");
    $location.path('/');
  } else {
    console.log("logged in");
    // $location.path('/all')
  }
};
CheckingUser();

checkoutFactory.getOrder({"email": email}, function(data) {
  console.log(email);
  console.log('this is the getorder',data);
  $scope.order = data
})






}])
