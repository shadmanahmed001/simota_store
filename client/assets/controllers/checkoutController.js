// console.log('checkoutController');
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

// Stripe
Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

Stripe.applePay.checkAvailability(function(available) {
  if (available) {
    document.getElementById('apple-pay-button').style.display = 'block';
  }
});

checkoutFactory.getOrder({"email": email}, function(data) {
  console.log('this is the getorder',data);
  $scope.order = data
})

$scope.payButtonPressed = function() {
  console.log('pay up sukka');
  $location.url('checkout')
}





}])
