(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationController', ['$scope', 'loginService', 'locationService', '$ionicLoading', LocationController]);
		
	function LocationController($scope, loginService, locationService, $ionicLoading) {

		//Functions
		// $scope.getUserInfo = getUserInfo;
		$scope.convertToMeters = convertToMeters;


		//Variables
		$scope.center = {};
		$scope.paths = {};
		$scope.location = {
			name: ""
		}

		$ionicLoading.show({
			template: 'Finding location...',
			duration: 1500
		});

		function findLocation() {
			navigator.geolocation.getCurrentPosition(function(pos) {
				console.log(pos)
				var locationResults = [];
				var locationObj = {
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				}
			    $scope.center = {
			        lat: pos.coords.latitude,
			        lng: pos.coords.longitude,
			        zoom: 14
			    };
			    $scope.markers = {
			        marker: {
			            draggable: false,
			            message: "",
			            lat: pos.coords.latitude,
			            lng: pos.coords.longitude,
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
			    function getLocation(scope, element, attrs) {
		            var geocoder = new google.maps.Geocoder();
		            var latlng = new google.maps.LatLng(locationObj.latitude, locationObj.longitude);
		            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
		            	console.log(results)
		            	locationResults.push(results[0].address_components[6].long_name);
		            	locationResults.push(results[0].address_components[2].long_name);
		            	locationResults.push(results[0].address_components[4].long_name);
		            	locationResults.push(results[0].address_components[5].long_name);


		            	//Check this in the morning
		            	locationObj.zipCode = locationResults[0];
		        		locationObj.city = locationResults[1];
		        		locationObj.state = locationResults[2];
		        		locationObj.country = locationResults[3];
		        		$scope.location = {
		        			name: locationObj.city + ", " + locationObj.state
		        		}

		            });
		        }
		        getLocation();
				$scope.paths.circle.radius = 15;


			});
		}
		findLocation();

		function convertToMeters() {
			$scope.paths.circle.radius = locationService.convertToMeters($scope.paths.circle.radius);

			console.log($scope.location);
			console.log($scope.paths);
		}

		// function getUserInfo() {
		// 	loginService.getUserInfo().then(success, fail);

		// 	function success(data) {
		// 		console.log(data);

		// 	    $scope.center = {
		// 	        lat: data[0].locations[0].latitude,
		// 	        lng: data[0].locations[0].longitude,
		// 	        zoom: 12
		// 	    };
		// 	    $scope.markers = {
		// 	        marker: {
		// 	            draggable: false,
		// 	            message: "Testing 123",
		// 	            lat: data[0].locations[0].latitude,
		// 	            lng: data[0].locations[0].longitude,
		// 	            icon: {}
		// 	        }
		// 	    };
		// 	    $scope.paths = {
		// 	        circle: {
		// 	            type: 'circle',
		// 	            radius: 20,
		// 	            latlngs: $scope.markers.marker,
		// 	            clickable: false
		// 	        }
		// 	    };
		// 	}

		// 	function fail(data) {
		// 		console.log(data);
		// 	}
		// }
		// $scope.getUserInfo();


		
	}
})();