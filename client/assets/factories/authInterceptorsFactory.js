// interceptors factory
console.log('authInterceptorsFactory factory started');

app.factory('authInterceptorsFactory', function($httpProvider) {
  var factory = {};

  factory.request = function(config) {
    var token = mainFactory.getToken();

    if (token) {
      config.headers['x-access-token'] = token;

      return config;
    }
  }

  return factory;
})
