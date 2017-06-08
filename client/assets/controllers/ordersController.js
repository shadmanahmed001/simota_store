// console.log('ordersController');
app.controller('ordersController', ['$scope', 'ordersFactory', '$routeParams','$location', '$cookieStore', '$http', function($scope, ordersFactory, $routeParams, $location, $cookieStore, $http){

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
CheckingUser();





ordersFactory.getOrder({"email": email}, function(data) {
  console.log('this is the getorder',data);
  $scope.order = data;
  $scope.items = data.length;


// TODO: get items to be picked up later

  // if (data.products) {
  //   for (var i = 0; i< data.products.length; i++){
  //     total = data.products[i].item.price + total
  //     $scope.total = total
  //   }
  // }
})


if ($routeParams){
  console.log($routeParams.id);
  ordersFactory.orderdetails($routeParams.id, function(data){
    console.log('this is the returned details', data.data);
    $scope.details = data
  })
}



// Stripe
// Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
//
// Stripe.applePay.checkAvailability(function(available) {
//   if (available) {
//     document.getElementById('apple-pay-button').style.display = 'block';
//   }
// });


// $scope.payButtonPressed = function() {
//   console.log('debug1');
//   beginApplePay();
//   function beginApplePay() {
//     console.log('inside the begin pay');
//     var paymentRequest = {
//       countryCode: 'US',
//       currencyCode: 'USD',
//       total: {
//         label: 'Smiota Store Workday',
//         amount: String($scope.total) // make var for this total
//       }
//     };
//     var session = Stripe.applePay.buildSession(paymentRequest, function(result, completion) {
//       console.log(paymentRequest);
//       console.log('here');
//       $http.post('/charges', { token: result.token.id, amount: $scope.total }).done(function(){
//         completion(ApplePaySession.STATUS_SUCCESS);
//         // redirect to recipt page
//         $location.path('/recipt')
//       }).fail(function() {
//         completion(ApplePaySession.STATUS_FAILURE);
//       });
//     }, function(error){
//       console.log(error.message);
//     });
//     session.oncancel = function() {
//       console.log(session);
//       console.log("User hit the cancel button in the payment window");
//     };
//     console.log('test');
//     session.begin();
//   }
//   // $location.url('orders')
// }

// jQuery
$(".button-collapse").sideNav();

$('ul.tabs').tabs();

$(".searchToggle").click(function() {
  $("#searchDiv").slideToggle( "slow" );
});



}])
