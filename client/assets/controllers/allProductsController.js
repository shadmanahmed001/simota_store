
app.controller('allProductsController', ['$scope','productsFactory','$routeParams', '$cookieStore', '$location', function($scope, productsFactory, $routeParams, $cookieStore, $location) {


//   var CheckingUser = function () {
//   if (!$cookieStore.get('email')) {
//     console.log("Not Logged In");
//     $location.path('/');
//   } else {
//     console.log("logged in");
//     console.log('testing uncomment at end');
//     console.log(window.location.href)
//
//     $location.path('/all')
//   }
// };
// CheckingUser();

$scope.username = $cookieStore.get('username')



  productsFactory.index(function(data) {
  $scope.products = data;
  })

$scope.addToCart = function(product) {

  // console.log("need to finish the cart stuff");
  // console.log(product);
  var email = $cookieStore.get('email');
  productsFactory.addToCart({"email": email, "product": product}, function(data) {
    console.log(data);
    // DO SOMETHING WITH returned_data
})
}


  $scope.create = function() {
      productsFactory.create($scope.newProduct, function(data) {
          productsFactory.index(function(data) {
              $scope.products = data;
              $scope.newProduct = {};
          })
      });
  }


  $scope.delete = function(product){
    productsFactory.delete(product, function(data){
      productsFactory.index(function(data){
        $scope.products = data;
      });
    });
  }

// jQuery
$(".button-collapse").sideNav();
$(".searchToggle").click(function() {
  $("#searchDiv").slideToggle( "slow" );
});






// end of the controller
}]);
