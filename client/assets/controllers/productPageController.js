
app.controller('productPageController', ['$scope','productsFactory','$routeParams', function($scope, productsFactory, $routeParams) {
console.log("this product controller is started");
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

}]);
