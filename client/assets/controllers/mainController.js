// console.log("mainController");
app.controller('mainController', ['$scope','mainFactory','$routeParams', '$location', '$cookieStore', '$rootScope', function($scope, mainFactory, $routeParams, $location, $cookieStore, $rootScope) {

  // This is the controller that will control the Index body

  // This will check function every time the route changes
  $rootScope.$on('$routeChangeStart', function(){
    if (mainFactory.isLoggedIn()){
      console.log('Success: User is logged in');
      mainFactory.getUser().then(function(data) {
        if(!$cookieStore.get('email')){
          // console.log(data);
          $cookieStore.put('username', data.data.username) // Adding the user name and email in the cookies
          $cookieStore.put('email', data.data.email)
        }
        $scope.username = data.data.username;    // Adding the username to scope
        // console.log(data.data);
        // console.log(data.data.email);
        // console.log(data.data.username);
        console.log('check of cookies', $cookieStore.get('username'));
        console.log('check of cookies', $cookieStore.get('email'));

      })
    } else {
      console.log('Failure: User is NOT logged in');
      $scope.username = '';
    }

  })



  // var CheckingUser = function () {
  //   if (!$cookieStore.get('email')) {
  //     console.log("Not Logged In");
  //     $location.url('/');
  //   } else {
  //     console.log("logged in");
  //   }
  // };
  // CheckingUser();

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
