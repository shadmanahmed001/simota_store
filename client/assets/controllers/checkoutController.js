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
  $scope.order = data;
  var total = 0;
  for (var i = 0; i< data.products.length; i++){
    total = data.products[i].item.price + total
    $scope.total = total
  }
})

$scope.payButtonPressed = function() {
  beginApplePay();
  function beginApplePay() {
    var paymentRequest = {
      countryCode: 'US',
      currencyCode: 'USD',
      total: {
        label: 'Smiota Store Workday',
        amount: String($scope.total) // make var for this total
      }
    };
    var session = Stripe.applePay.buildSession(paymentRequest, function(result, completion) {
      console.log(paymentRequest);

      $http.post('/charges', { token: result.token.id }).done(function(){
        completion(ApplePaySession.STATUS_SUCCESS);
        // redirect to recipt page
        $location.path('/recipt')
      }).fail(function() {
        completion(ApplePaySession.STATUS_FAILURE);
      });
    }, function(error){
      console.log(error.message);
    });
    session.oncancel = function() {
      console.log("User hit the cancel button in the payment window");
    };
    console.log('test');
    session.begin();
  }
  // $location.url('checkout')
}





}])
