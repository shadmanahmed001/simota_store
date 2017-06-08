
app.controller('allProductsController', ['$scope','productsFactory','$routeParams', '$cookieStore', '$location', function($scope, productsFactory, $routeParams, $cookieStore, $location) {


$scope.username = $cookieStore.get('username')
var email = $cookieStore.get('email')

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


productsFactory.usercart({"email": email}, function(data) {
$scope.user = data;
if (data.cart){
  $scope.cart = data.cart
}
console.log('this should be the user', data);
getCartTotal(data)
});


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

$scope.addToCart = function(product) {
  product.howmany = 1
  var email = $cookieStore.get('email');
  $("#add" + product._id).hide(function() {
    $(".buttonchange" + product._id).show();
  });
  productsFactory.addToCart({"email": email, "product": product, "quantity": product.howmany}, function(data) {
    console.log('this is the cart', data);
    getCartTotal(data);
    Materialize.toast(''+ $scope.cartTotal+" item in cart"+'<a href="/#!/cart">CHECKOUT</a>', 4000);
    // $location.path('/all')
  })
}

$scope.add = function(product) {
  var email = $cookieStore.get('email');
  if (product.howmany === product.quantity) {
    console.log('item sold out');
    return
  }
  product.howmany = product.howmany + 1
  productsFactory.addToCart({"email": email, "product": product, "quantity": product.howmany}, function(data) {
    console.log('this is the cart', data);
    getCartTotal(data);
    Materialize.toast(''+ $scope.cartTotal+" item in cart"+'<a href="/#!/cart">CHECKOUT</a>', 4000);
    // $location.path('/all')
  })
}

$scope.minus = function(product) {
  var email = $cookieStore.get('email');
  if (product.howmany <= 1){
    console.log('Need min quantity');
    return
  }
  product.howmany = product.howmany - 1;
  productsFactory.addToCart({"email": email, "product": product, "quantity": product.howmany}, function(data) {
    console.log('this is the cart', data);
    getCartTotal(data);
    Materialize.toast(''+ $scope.cartTotal+" item in cart"+'<a href="/#!/cart">CHECKOUT</a>', 4000);
    // $location.path('/all')
  })
}

// jQuery
$(".button-collapse").sideNav();

$('ul.tabs').tabs();

$(".searchToggle").click(function() {
  $("#searchDiv").slideToggle( "slow" );
});

// $(".button-collapse").sideNav({
//     closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
//     draggable: true // Choose whether you can drag to open on touch screens
//   }
// );


// end of the controller
}]);
