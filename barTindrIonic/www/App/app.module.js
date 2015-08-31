(function() {
  angular.module('BarTindrApp', [
    'ionic', 
    'ngRoute',
    'leaflet-directive',
    'angularReverseGeocode',
    'ngAutocomplete',
    'ionic-pullup',
    'ionic.contrib.ui.tinderCards',
    'ngAnimate'
    ])
  .run(['$ionicPlatform', IonicPlatform])
  .filter('toMiles', toMiles)
  .filter('toMiles1', toMiles1)
  .filter('cardRatingFood', cardRatingFood)
  .filter('cardRatingDrink', cardRatingDrink)
  .filter('cardRatingDo', cardRatingDo)
  .filter('cardRatingShop', cardRatingShop)
  .filter('tierFilter', tierFilter);

  function tierFilter() {
    return function(input) {
      if(input == undefined || input == null || input == "") {
        return "$"
      }
      if(input == 1) {
        return "$"
      }
      if(input == 2) {
        return "$ $"
      }
      if(input == 3) {
        return "$ $ $"
      }
    }
  }

  function cardRatingFood() {
    return function(input) {
      var dividedRating = (input / 2).toFixed(0);
      if(input == undefined || input == null || input == "") {
        return "<i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i>"
      }
      if(dividedRating == 5) {
        return "<i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i>"
      }
      if(dividedRating == 4) {
        return "<i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork fork-inactive'></i>"
      }
      if(dividedRating == 3) {
        return "<i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i>"
      }
      if(dividedRating == 2) {
        return "<i class='icon ion-fork active-rating'></i> <i class='icon ion-fork active-rating'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i>"
      }
      if(dividedRating == 1) {
        return "<i class='icon ion-fork active-rating'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i>"
      }
      if(dividedRating == 0) {
        return "<i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i> <i class='icon ion-fork fork-inactive'></i>"
      }

      return dividedRating;
    }
  }

  function cardRatingDrink() {
    return function(input) {
      var dividedRating = (input / 2).toFixed(0);
      if(input == undefined || input == null || input == "") {
        return "<i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i>"
      }
      if(dividedRating == 5) {
        return "<i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i>"
      }
      if(dividedRating == 4) {
        return "<i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer fork-inactive'></i>"
      }
      if(dividedRating == 3) {
        return "<i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i>"
      }
      if(dividedRating == 2) {
        return "<i class='icon ion-beer active-rating'></i> <i class='icon ion-beer active-rating'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i>"
      }
      if(dividedRating == 1) {
        return "<i class='icon ion-beer active-rating'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i>"
      }
      if(dividedRating == 0) {
        return "<i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i> <i class='icon ion-beer fork-inactive'></i>"
      }

      return dividedRating;
    }
  }

  function cardRatingDo() {
    return function(input) {
      var dividedRating = (input / 2).toFixed(0);
      if(input == undefined || input == null || input == "") {
        return "<i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i>"
      }
      if(dividedRating == 5) {
        return "<i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i>"
      }
      if(dividedRating == 4) {
        return "<i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk fork-inactive'></i>"
      }
      if(dividedRating == 3) {
        return "<i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i>"
      }
      if(dividedRating == 2) {
        return "<i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i>"
      }
      if(dividedRating == 1) {
        return "<i class='icon ion-android-walk active-rating'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i>"
      }
      if(dividedRating == 0) {
        return "<i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i> <i class='icon ion-android-walk fork-inactive'></i>"
      }

      return dividedRating;
    }
  }

  function cardRatingShop() {
    return function(input) {
      var dividedRating = (input / 2).toFixed(0);
      if(input == undefined || input == null || input == "") {
        return "<i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i>"
      }
      if(dividedRating == 5) {
        return "<i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i>"
      }
      if(dividedRating == 4) {
        return "<i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag fork-inactive'></i>"
      }
      if(dividedRating == 3) {
        return "<i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i>"
      }
      if(dividedRating == 2) {
        return "<i class='icon ion-bag active-rating'></i> <i class='icon ion-bag active-rating'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i>"
      }
      if(dividedRating == 1) {
        return "<i class='icon ion-bag active-rating'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i>"
      }
      if(dividedRating == 0) {
        return "<i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i> <i class='icon ion-bag fork-inactive'></i>"
      }

      return dividedRating;
    }
  }


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

  function toMiles1() {
    return function(input) {
      var miles = (input / 1609.344).toFixed(1);

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
