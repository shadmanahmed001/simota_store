console.log("login controller is started");

app.controller('loginController', ['$scope', '$location', 'userFactory', '$cookieStore',  function ($scope, $location, userFactory, $cookieStore) {

  $scope.existingUser = {};
  $scope.error_messages = [];

  // Google Sign In Functions
  var onFailure = function(error) {
    console.log(error);
  };
  // function onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  // };
//   function renderButton() {
//   gapi.signin2.render('my-signin2', {
//   'scope': 'profile email',
//   'width': 240,
//   'height': 50,
//   'longtitle': true,
//   'theme': 'dark',
//   'onsuccess': onSuccess,
//   'onfailure': onFailure
// });
// }
function onSignIn(googleUser) {
  $scope.profile = googleUser.getBasicProfile();
  console.log("in this funciton");
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
};
// Sign Out Of Google
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  console.log($scope.profile);

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
  //                            Login User
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
