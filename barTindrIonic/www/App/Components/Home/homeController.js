(function() {
	angular
		.module('BarTindrApp')
		.controller('HomeController', ['$scope', 'loginService', '$location', 'homeService', '$timeout', '$state', HomeController]);

	function HomeController($scope, loginService, $location, homeService, $timeout, $state) {

		//Functions
		$scope.logoutUser = logoutUser;
		$scope.setLocation = setLocation;
		$scope.getUserInfo = getUserInfo;
		

		function logoutUser() {
			loginService.logout();
			$state.go('login');
		}

		function setLocation() {		
			navigator.geolocation.getCurrentPosition(function(pos) {
				var locationResults = [];
				var locationObj = {
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				}
				function getLocation(scope, element, attrs) {
		            var geocoder = new google.maps.Geocoder();
		            var latlng = new google.maps.LatLng(locationObj.latitude, locationObj.longitude);
		            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
		            	locationResults.push(results[0].address_components[6].long_name);
		            	locationResults.push(results[0].address_components[2].long_name);
		            	locationResults.push(results[0].address_components[4].long_name);
		            	locationResults.push(results[0].address_components[5].long_name);


		            	//Check this in the morning
		            	locationObj.zipCode = locationResults[0];
		        		locationObj.city = locationResults[1];
		        		locationObj.state = locationResults[2];
		        		locationObj.country = locationResults[3];
		            });
		        }


		        getLocation();

				$timeout(function(){homeService.setNewLocation(locationObj).then(success, fail)}, 400);				

				function success(data) {
					console.log(data);
				}

				function fail(data) {
					console.log(data);
				}

			});
		}

		//I'm kinda drunk and this works now! It gets user info
		function getUserInfo() {
			loginService.getUserInfo().then(success, fail);

			function success(data) {
				console.log(data);
			}

			function fail(data) {
				console.log(data);
			}
		}
		getUserInfo();
	}

})();