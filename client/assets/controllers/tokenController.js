console.log("tokenController");
app.controller('tokenController', ['$scope','mainFactory','$routeParams', '$location', function($scope, mainFactory, $routeParams, $location) {
console.log('hi');
  // This is the controller that will control the JSON token setting

mainFactory.facebook($routeParams.token);
  // console.log($routeParams.token);
  // Sending the user to the products page
  $location.path('/all')

  // send the token to back and get username and email to store in fac
}]);
