// console.log("signoutController");
app.controller('signoutController', ['$scope','mainFactory','$routeParams', '$location', '$cookieStore', '$rootScope', function($scope, mainFactory, $routeParams, $location, $cookieStore, $rootScope) {



    mainFactory.logout();
    $location.path('/')


}]);
