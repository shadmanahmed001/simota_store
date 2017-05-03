
app.controller('newController', ['$scope','productsFactory','$routeParams', function($scope, productsFactory, $routeParams) {
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
