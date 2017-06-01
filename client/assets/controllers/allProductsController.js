
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

$scope.quantityLeft = "Only 3 left"

  productsFactory.index(function(data) {
  $scope.products = data;
  })

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

// Add to Cart
$scope.addToCart = function(product, $countVal) {
  var email = $cookieStore.get('email');
  $scope.countVal = 1
  $("#add" + product._id).hide(function() {
    $(".buttonchange" + product._id).show();
  });
  productsFactory.addToCart({"email": email, "product": product, "quantity": $scope.countVal}, function(data) {
    console.log('this is the cart', data);
    // $location.path('/all')
  })
}

$scope.add = function(product) {
  var email = $cookieStore.get('email');
  if ($scope.countVal === product.quantity) {
    console.log('item sold out');
    return
  }
  $scope.countVal = $scope.countVal + 1
  productsFactory.addToCart({"email": email, "product": product, "quantity": $scope.countVal}, function(data) {
    console.log('this is the cart', data);
    // $location.path('/all')
  })
}

$scope.minus = function(product) {
  var email = $cookieStore.get('email');
  if ($scope.countVal <= 1){
    console.log('Need min quantity');
    return
  }
  $scope.countVal = $scope.countVal - 1
  productsFactory.addToCart({"email": email, "product": product, "quantity": $scope.countVal}, function(data) {
    console.log('this is the cart', data);
    // $location.path('/all')
  })
}

// jQuery
$(".button-collapse").sideNav();

$(".searchToggle").click(function() {
  $("#searchDiv").slideToggle( "slow" );
});



// end of the controller
}]);
