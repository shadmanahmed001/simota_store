console.log("Loading Master App JS");

var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'partials/login.html',
    // controller : 'loginController'
  })
  .when('/mainpage/:token',{
    templateUrl: 'partials/mainpage.html',
    controller : 'tokenController'
  })
  .when('/adminlogin',{
    templateUrl: 'partials/adminlogin.html',
    controller : 'adminLoginController'
  })
  .when('/edit/:id',{
    templateUrl: 'partials/edit.html',
    controller : 'adminAddProductController'
  })
    .when('/all', {
      templateUrl: 'partials/allproducts.html',
      controller : 'allProductsController'
    })
    .when('/adminaddproduct', {
      templateUrl: 'partials/adminAddProduct.html',
      controller : 'adminAddProductController'
    })
    .when('/manager', {
      templateUrl: 'partials/manager.html',
      // controller : 'adminAddProductController'
    })
    .otherwise({
      redirectTo: '/'
    })
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorsFactory');
});
