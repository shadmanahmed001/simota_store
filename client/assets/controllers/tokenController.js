console.log("tokenController");
app.controller('tokenController', ['$scope','mainFactory','$routeParams', '$location', function($scope, mainFactory, $routeParams, $location) {


console.log('in the token contrlr');
  // This is the controller that will control the JSON token setting
console.log('herein token');
mainFactory.facebook($routeParams.token);
  console.log('stupid safari');
  console.log($routeParams.token);
  console.log(window.location.href)


  // Sending the user to the products page
  // $location.path('/all')

  // send the token to back and get username and email to store in fac
}]);
