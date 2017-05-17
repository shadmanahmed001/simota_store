app.controller('adminAddProductController', ['$scope', 'adminFactory','$routeParams','$location', '$cookieStore', function($scope, adminFactory, $routeParams, $location, $cookieStore){
  // -------------------------------------------------------------------------
  //                            jQuery
  // -------------------------------------------------------------------------
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 1 // Creates a dropdown of 15 years to control year
  });
  // -------------------------------------------------------------------------
  //                            Admin Facotry Methods
  // -------------------------------------------------------------------------

  // Checking if the person is Admin or not then redirecting
  CheckingUser();
  function CheckingUser(){
    if(!$cookieStore.get('username')){
      console.log("Not logged in");
      $location.path('/')
    }
    else if ($cookieStore.get('username') != 'admin'){
      console.log('not an admin');
      $location.path('/');
    }
  }


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
    adminFactory.create($scope.newProduct, function(data) {
        adminFactory.index(function(data) {
            $scope.products = data;
            $scope.newProduct = {};
        })
    });
}

}])
