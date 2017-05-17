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
  console.log('this is the user cart is',$scope.cart);
});

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
    $location.path('/checkout')

  })
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






}])
