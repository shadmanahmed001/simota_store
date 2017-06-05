// console.log('cart');
app.controller('cartController', ['$scope', 'cartFactory','$routeParams','$location', '$cookieStore', function($scope, cartFactory, $routeParams, $location, $cookieStore){
$scope.username = $cookieStore.get('username')
var email = $cookieStore.get('email')

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

  cartFactory.usercart({"email": email}, function(data) {
  $scope.user = data;
  $scope.cart = data.cart
  console.log('cart',$scope.cart);

  console.log('this is the user',data);
  getCartTotal(data);
});

function getCartTotal(data){
  var sum = 0;
  var price = 0;
  for (var i = 0; i < data.cart.length; i++){
    if (data.cart[i].quantity > 1){
      price += data.cart[i].item.price * data.cart[i].quantity
      sum += data.cart[i].quantity
    }
    else {
      price += data.cart[i].item.price
      sum += data.cart[i].quantity
    }
  }
  if (data.cart.length === 0){
    sum = 0
    price = 0
  }
  $scope.cartTotal = sum;
  $scope.totalPrice = price;
}
// FIGURE OUT THE TAX


$scope.editCart = function(item, newQuantity){
  cartFactory.editCart({"email": email, "product": item.item, "quantity": newQuantity}, function(data) {
    if(data.errors){
      $scope.error_messages = "Invalid: Min is 1"
    }
    else{
      $scope.user = data;
    }
    // $scope.cart = data.cart
    $location.path('/cart')
  })
};

$scope.deleteFromCart = function(item) {
  cartFactory.deleteFromCart({"email": email, "cartId": item._id}, function(data) {
    $scope.cart = data.cart
    $scope.user = data;
    $location.path('/cart')
  })
};

$scope.makeOrder = function() {
  console.log($scope.user);
  cartFactory.makeOrder($scope.user, function(data) {
    console.log('this is from the makeorder',data);
    $location.path('/revieworder')

  })
}

// Stripe
Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

Stripe.applePay.checkAvailability(function(available) {
  if (available) {
    document.getElementById('apple-pay-button').style.display = 'block';
  }
});

$scope.payButtonPressed = function() {
  console.log('debug1');
  beginApplePay();
  function beginApplePay() {
    console.log('inside the begin pay');
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
      console.log('here');
      $http.post('/charges', { token: result.token.id, amount: $scope.total }).done(function(){
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
      console.log(session);
      console.log("User hit the cancel button in the payment window");
    };
    console.log('test');
    session.begin();
  }
  // $location.url('checkout')
}


// console.log($routeParams.id);
// cartFactory.show($routeParams.id, function(data){
//   $scope.editproducts = data
// })

// $scope.delete = function(product){
//   cartFactory.delete(product, function(data){
//     cartFactory.index(function(data){
//       $scope.products = data;
//     });
//   });
// };
//
// $scope.update = function(){
//   console.log('here');
//   cartFactory.update($scope.editproducts, function(data){
//     $scope.product = data
//     $location.path('/adminaddproduct')
//   })
// };


// jQuery
$(".button-collapse").sideNav();



}])
