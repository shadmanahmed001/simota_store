// console.log("Clientside mainFactory");
// Using to set Token for persistent login

app.factory('mainFactory', ['$http', '$cookieStore', '$window', function($http, $cookieStore, $window){
var factory = {};

  // mainFactory.setToken(token);
  factory.setToken = function(token){
    console.log('running this');
    if (token) {
      // $window.localStorage.token = token;
      console.log(token)
      $window.localStorage.setItem('token', token);
    } else {
      $window.localStorage.removeItem('token');
    }
  };

  // mainFactory.facebook(token)
  factory.facebook = function(token) {
    console.log('this is the token',token);
    factory.setToken(token)
  }

  // mainFactory.getToken()
  factory.getToken = function() {
    console.log('here');
    console.log($window.localStorage.getItem('token'));
    return $window.localStorage.getItem('token');
  };

  // mainFactory.isLoggedIn()
  factory.isLoggedIn = function() {
    console.log('main fac', factory.getToken());
    if (factory.getToken()){
      console.log('this is a test',factory.getToken());
      return true;
    } else {
      return false;
    }
  };

  // mainFactory.logout()
  factory.logout = function() {
    $cookieStore.remove('email');
    $cookieStore.remove('username');
    $cookieStore.remove('cart');
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
