
app.controller('showProductController', ['$scope','productsFactory','$routeParams', '$cookieStore', '$location', function($scope, productsFactory, $routeParams, $cookieStore, $location) {

  $scope.showError = ""
// Product Show Page
  productsFactory.show($routeParams.id, function(data){
    $scope.showproducts = data
  })

  $scope.addToCart = function(product, quantity) {
    if (quantity > product.quantity){
      $scope.showError = "Choose amount that is within stock!"
    }
    else {
    var email = $cookieStore.get('email');
    productsFactory.addToCart({"email": email, "product": product, "quantity": quantity}, function(data) {
      console.log('this is the cart', data);
      $location.path('/all')
    })
  }
  }


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

$scope.username = $cookieStore.get('username')

  // productsFactory.index(function(data) {
  // $scope.products = data;
  // })



  // $scope.create = function() {
  //     productsFactory.create($scope.newProduct, function(data) {
  //         productsFactory.index(function(data) {
  //             $scope.products = data;
  //             $scope.newProduct = {};
  //         })
  //     });
  // }


  // $scope.delete = function(product){
  //   productsFactory.delete(product, function(data){
  //     productsFactory.index(function(data){
  //       $scope.products = data;
  //     });
  //   });
  // }



}]);
