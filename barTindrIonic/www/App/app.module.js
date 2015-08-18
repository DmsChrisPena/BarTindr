(function() {
  angular.module('BarTindrApp', [
    'ionic', 
    'ngRoute'
    ])

  .run(['$location', '$rootScope', LoginCheck])

  .run(['$ionicPlatform', IonicPlatform]);

  function LoginCheck($location, $rootScope) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if($window.sessionStorage.getItem('token')) {
        if(next.templateUrl == "App/Components/Login/loginView.html") {
          $location.path('/');
        }
        if(next.templateUrl == "App/Components/Register/registerView.html") {
          $location.path('/');
        }
      } else {
        $location.path('/');
      }
    });
  }

  function IonicPlatform($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  }
})();
