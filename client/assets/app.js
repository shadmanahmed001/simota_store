console.log("Loading Master App JS");

var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'partials/login.html',
    controller : 'loginController'
  })
  .when('/mainpage/:token',{
    templateUrl: 'partials/mainpage.html',
    controller : 'tokenController'
  })
  .when('/adminlogin',{
    templateUrl: 'partials/adminlogin.html',
    // controller : 'loginController'
  })
    .when('/edit/:id',{
      templateUrl: 'partials/edit.html',
      controller : 'editController'
    })
    .when('/all', {
      templateUrl: 'partials/allproducts.html',
      controller : 'newController'
    })
    .otherwise({
      redirectTo: '/'
    })
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorsFactory');
});
