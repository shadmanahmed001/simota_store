
app.controller('editController', ['$scope','productsFactory', '$routeParams', function($scope, productsFactory, $routeParams) {

  var CheckingUser = function () {
  if (!$cookieStore.get('logged-in')) {
    console.log("Not Logged In");
    $location.url('/');
  } else {
    console.log("logged in");
  }
};
CheckingUser();

   productsFactory.show($routeParams.id, function(returnedData){
     $scope.product = returnedData;
   });
   $scope.update = function(){
     productsFactory.update($scope.product, function(data){
       $scope.product = data
     })
     }

  //  $scope.update(/*What goes here?*/)
  /*
    OUR $scope.update function goes here <-- $scope because we need to access this method
    with ng-submit or ng-click (from the form in the previous assignment).  Want to see
    all of the friends when we get back including the updated on??
    See Index in the previous controller.
  */
}]);
