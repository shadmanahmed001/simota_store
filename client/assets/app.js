console.log("Loading Master App JS");

var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'partials/login.html',
    controller : 'loginController'
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
