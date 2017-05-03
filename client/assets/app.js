
var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/edit/:id',{
      templateUrl: 'partials/edit.html',
      controller : 'editController'
    })
    .when('/all', {
      templateUrl: 'partials/all.html',
      controller : 'newController'
    })
    .otherwise({
      redirectTo: '/'
    })
});
