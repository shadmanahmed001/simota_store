
app.controller('editController', ['$scope','friendsFactory', '$routeParams', function($scope, friendsFactory, $routeParams) {
   friendsFactory.show($routeParams.id, function(returnedData){
     $scope.friend = returnedData;
   });
   $scope.update = function(){
     friendsFactory.update($scope.friend, function(data){
       $scope.friend = data
     })
    //
     }

  //  $scope.update(/*What goes here?*/)
  /*
    OUR $scope.update function goes here <-- $scope because we need to access this method
    with ng-submit or ng-click (from the form in the previous assignment).  Want to see
    all of the friends when we get back including the updated on??
    See Index in the previous controller.
  */
}]);
