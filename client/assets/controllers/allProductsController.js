
app.controller('allProductsController', ['$scope','productsFactory','$routeParams', '$cookieStore', '$location', function($scope, productsFactory, $routeParams, $cookieStore, $location) {


  var CheckingUser = function () {
  if (!$cookieStore.get('email')) {
    console.log("Not Logged In");
    $location.path('/');
  } else {
    console.log("logged in");
    $location.path('/all')
  }
};
CheckingUser();

$scope.username = $cookieStore.get('username')
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






  // $scope.show = function(product){
  //   productsFactory.show(product, function(data){
  //     console.log(data);
  //     $scope.data = data;
  //   })
  // }
}]);
