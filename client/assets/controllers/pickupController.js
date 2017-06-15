// console.log('cart');
app.controller('pickupController', ['$scope', 'cartFactory','$routeParams','$location', '$cookieStore', '$http', function($scope, cartFactory, $routeParams, $location, $cookieStore, $http){
$scope.username = $cookieStore.get('username')
var email = $cookieStore.get('email')


var qrcode = new QRCode("qrcode");

function makeCode () {
    // var elText = document.getElementById("text");
    //
    // if (!elText.value) {
    //     alert("Input a text");
    //     elText.focus();
    //     return;
    // }
    console.log($routeParams.id);
    // qrcode.makeCode(elText.value);
    qrcode.makeCode($routeParams.id);
    // elText.focus()

}

makeCode();


// jQuery
$(".button-collapse").sideNav();

$('ul.tabs').tabs();

$(".searchToggle").click(function() {
  $("#searchDiv").slideToggle( "slow" );
});

// $("#text").
// on("blur", function () {
//   makeCode();
// }).
// on("keydown", function (e) {
//   if (e.keyCode == 13) {
//     makeCode();
//   }
// });


}])
