(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationController', ['$scope', 'loginService', 'locationService', LocationController]);
		
	function LocationController($scope, loginService, locationService) {

		//Functions
		$scope.getUserInfo = getUserInfo;
		$scope.convertToMeters = convertToMeters;

		//Variables
		$scope.center = {};
		$scope.paths = {};

		function convertToMeters() {
			var locationMeters = locationService.convertToMeters($scope.paths.circle.radius);
			console.log(locationMeters);
		}

		function getUserInfo() {
			loginService.getUserInfo().then(success, fail);

			function success(data) {
				console.log(data);

			    $scope.center = {
			        lat: data[0].locations[0].latitude,
			        lng: data[0].locations[0].longitude,
			        zoom: 12
			    };
			    $scope.markers = {
			        marker: {
			            draggable: false,
			            message: "Testing 123",
			            lat: data[0].locations[0].latitude,
			            lng: data[0].locations[0].longitude,
			            icon: {}
			        }
			    };
			    $scope.paths = {
			        circle: {
			            type: 'circle',
			            radius: 20,
			            latlngs: $scope.markers.marker,
			            clickable: false
			        }
			    };
			}

			function fail(data) {
				console.log(data);
			}
		}
		$scope.getUserInfo();


		
	}
})();