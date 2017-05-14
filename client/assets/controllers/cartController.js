// console.log('cart');
app.controller('cartController', ['$scope', 'cartFactory','$routeParams','$location', '$cookieStore', function($scope, cartFactory, $routeParams, $location, $cookieStore){

$scope.username = $cookieStore.get('username')

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

  var email = $cookieStore.get('email')
  cartFactory.usercart({"email": email}, function(data) {
  $scope.cart = data.cart;
  console.log($scope.cart);
});

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
