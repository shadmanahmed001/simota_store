console.log("mainController");
app.controller('mainController', ['$scope','mainFactory','$routeParams', '$location', function($scope, mainFactory, $routeParams, $location) {

  // This is the controller that will control the Index body


  if (mainFactory.isLoggedIn()){
    console.log('Success: User is logged in');
    mainFactory.getUser().then(function(data) {
      console.log(data);
    })
  } else {
    console.log('Failure: User is NOT logged in');
  }




  $scope.logout = function(){
    // do something
    console.log("in the logout");
    mainFactory.logout();
    $location.path('/')
  }

  //     productsFactory.index(function(data) {
  //     $scope.products = data;
  //     })
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
  // $scope.show = function(product){
  //   productsFactory.show(product, function(data){
  //     console.log(data);
  //     $scope.data = data;
  //   })
  // }
}]);
