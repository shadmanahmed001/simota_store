// console.log("adminLoginController is started");

app.controller('adminLoginController', ['$scope', '$location', 'userFactory', '$cookieStore',  function ($scope, $location, userFactory, $cookieStore) {
  // $scope.adminLogin = {}
  $scope.error_messages = "";

  $scope.loginAdmin = function() {

    if ($scope.adminLogin.email && $scope.adminLogin.password){
      console.log('should be filled');
      if ($scope.adminLogin.email === 'admin@smiota.com' && $scope.adminLogin.password == 'asdf'){
        console.log('Admin is logged in');
        $location.path('/adminaddproduct')
      }
      if ($scope.adminLogin.email === 'manager@smiota.com' && $scope.adminLogin.password == 'asdf'){
        console.log('Manager is logged in');
        $location.path('/manager')
      }
    else {
      $scope.error_messages = 'Invalid';
    }
  }


  }

// Sign Out Of Google
  // function signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
  //
  // console.log($scope.profile);

  // -------------------------------------------------------------------------
  //                            Check Logged In User
  // -------------------------------------------------------------------------
  // var CheckingUser = function () {
  //   if (!$cookieStore.get('logged-in')) {
  //     console.log("Not Logged In");
  //     // $location.url('/');
  //   } else {
  //     $location.url('/userdashboard');
  //   }
  // };
  // CheckingUser();




  // -------------------------------------------------------------------------
  //                            Login Admin User
  // -------------------------------------------------------------------------
  $scope.login = function () {
    console.log($scope.existingUser);
    userFactory.login($scope.existingUser, function (dataFromServer) {
      if (dataFromServer.success === false) {
        console.log(dataFromServer.error_messages);
        $scope.success = false;
        $scope.error_messages = dataFromServer.error_messages;
      } else {
        if (dataFromServer.user.admin === 2) {
          console.log("Sending User to inventory");
          $scope.existingUser = {};
          $location.url('/inventory');
        } else {
          $scope.existingUser = {};
          $location.url('/userdashboard');
        }
      }
    });
  };





  // -------------------------------------------------------------------------
  //                            Login User
  // -------------------------------------------------------------------------
  // $scope.logout = function () {
  //   userFactory.logout(function (dataFromServer) {
  //     $scope.existingUser = {};
  //     $scope.success = false;
  //     $scope.error_messages = ["Successfully Logged Out"];
  //     $location.url('/');
  //   });
  // };

}]);
