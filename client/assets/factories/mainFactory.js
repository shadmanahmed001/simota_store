// console.log("Clientside mainFactory");
// Using to set Token for persistent login

app.factory('mainFactory', ['$http', '$cookieStore', '$window', function($http, $cookieStore, $window){
var factory = {};

  // mainFactory.setToken(token);
  factory.setToken = function(token){
    if (token) {
      $window.localStorage.setItem('token', token);
    } else {
      $window.localStorage.removeItem('token');
    }
  };

  // mainFactory.facebook(token)
  factory.facebook = function(token) {
    factory.setToken(token)
  }

  // mainFactory.getToken()
  factory.getToken = function() {
    return $window.localStorage.getItem('token');
  };

  // mainFactory.isLoggedIn()
  factory.isLoggedIn = function() {
    if (factory.getToken()){
      return true;
    } else {
      return false;
    }
  };

  // mainFactory.logout()
  factory.logout = function() {
    $cookieStore.remove('email');
    $cookieStore.remove('username');
    factory.setToken();
  }

  // mainFactory.getUser()
  factory.getUser = function(token, callback){
    if (factory.getToken()){
      return $http.post('/verifytoken');
    } else {
      $q.reject({ message: 'User has no token' })
    }
  }



  return factory;
}])
