
var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/edit/:id',{
      templateUrl: 'partials/edit.html',
      controller : 'editController'
    })
    .when('/new', {
      templateUrl: 'partials/new.html',
      controller : 'newController'

    })
    .otherwise({
      redirectTo: '/'
    })
});
