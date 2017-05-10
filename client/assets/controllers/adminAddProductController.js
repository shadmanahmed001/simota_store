app.controller('adminAddProductController', ['$scope', 'adminFactory','$routeParams','$location', function($scope, adminFactory, $routeParams, $location){

  
  adminFactory.index(function(data) {
  $scope.products = data;
});

// console.log($routeParams.id);
adminFactory.show($routeParams.id, function(data){
  $scope.editproducts = data
})

$scope.delete = function(product){
  adminFactory.delete(product, function(data){
    adminFactory.index(function(data){
      $scope.products = data;
    });
  });
};

$scope.update = function(){
  console.log('here');
  adminFactory.update($scope.editproducts, function(data){
    $scope.product = data
    $location.path('/adminaddproduct')
  })
};




$scope.create = function() {
  console.log($scope.newProduct.expiry);
    adminFactory.create($scope.newProduct, function(data) {
        adminFactory.index(function(data) {
            $scope.products = data;
            $scope.newProduct = {};
        })
    });
}

}])
