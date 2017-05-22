// interceptors factory
// console.log('authInterceptorsFactory factory started');

app.factory('authInterceptorsFactory', function($window) {
  var factory = {};

  factory.request = function(config) {
    var token = factory.getToken();

    if (token) {
      config.headers['x-access-token'] = token;

      return config;
    }
  }

  factory.getToken = function() {
    return $window.localStorage.getItem('token');
  };

  factory.getUser = function(token, callback){
    if (factory.getToken()){
      return $http.post('/verifytoken');
    } else {
      $q.reject({ message: 'User has no token' })
    }
  }

  factory.request = function(config) {
    var token = factory.getToken();
    if(token) config.headers['x-access-token'] = token;
    return config;
  }


  return factory;
})


// mainFactory.getUser()
