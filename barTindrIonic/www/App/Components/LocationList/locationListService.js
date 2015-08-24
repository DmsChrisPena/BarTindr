(function() {
	angular
		.module('BarTindrApp')
		.factory('locationListService', ['$http', '$q', '$window', '$ionicPopup', '$state', locationListService])
		.service('getLocationService', ['$ionicPopup', getLocationService]);


		function getLocationService($ionicPopup) {
			var locationInformation = '';

			return {
				getLocation: function() {
					if(locationInformation == '') {						
						$ionicPopup.alert({
							title: '<h5>No Location Infomation</h5>',
							template: '<h5 class="text-center">Couldn\'t find your location. Please Try again...</h5>'
						});
						return false
					} else {
						return locationInformation
					}
				},
				setLocation: function(locInfo) {
					locationInformation = locInfo;
				}
			}
		}

		function locationListService($http, $q, $window, $ionicPopup, $state) {
			var service = {};

			service.getUserInfo = getUserInfo;

			function getUserInfo() {
				$state.reload();
				var deferred = $q.defer();

				$http({
					url: 'http://localhost:52355/api/user',
					method: 'GET',
					header: { 'Authorization': 'Bearer ' + $window.sessionStorage.getItem('token') }
				}).success(function(data) {
					deferred.resolve(data);
				}).error(function(data) {
					deferred.reject(data);
					//Error message with redirect
					$ionicPopup.alert({
						title: '<h5>Could not load Locations</h5>',
						template: '<h5 class="text-center">Please Try again...</h5>'
					});
					$state.go('home');
				});

				return deferred.promise;
			}


			return service;
		};

})();