(function() {
  angular.module('BarTindrApp', [
    'ionic', 
    'ngRoute',
    'leaflet-directive',
    'angularReverseGeocode',
    'ngAutocomplete'
    ])
  .run(['$ionicPlatform', IonicPlatform])
  .filter('toMiles', toMiles);

  function toMiles() {
    return function(input) {
      var miles = (input / 1609.344).toFixed(0);

      if(miles == 1) {
        return miles + ' Mile';
      } else {
        return miles + ' Miles';
      }
    }
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
  })

  }
})();
