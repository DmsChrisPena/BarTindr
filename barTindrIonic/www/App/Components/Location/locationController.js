(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationController', ['$scope', 'loginService', 'locationService', '$ionicLoading', 'homeService', '$state', LocationController]);
		
	function LocationController($scope, loginService, locationService, $ionicLoading, homeService, $state) {

		//Functions
		// $scope.getUserInfo = getUserInfo;
		$scope.convertToMeters = convertToMeters;
		$scope.setLocation = setLocation;


		//Variables
		$scope.center = {};
		$scope.paths = {};
		$scope.location = {
			name: ""
		}

		$ionicLoading.show({
			template: 'Finding location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
			duration: 2000
		});

		function findLocation() {
			navigator.geolocation.getCurrentPosition(function(pos) {
				console.log(pos)
				var locationResults = [];
				var locationObj = {
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude
				}

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
					    $scope.center = {
					        lat: pos.coords.latitude,
					        lng: pos.coords.longitude,
					        zoom: 10
					    };
					    $scope.markers = {
					        marker: {
					            draggable: false,
					            message: $scope.location.name,
					            lat: pos.coords.latitude,
					            lng: pos.coords.longitude,
					            icon: {}
					        }
					    };
					    $scope.paths = {
					        circle: {
					            type: 'circle',
					            radius: 24140.2,
					            miles: 15,
					            state: locationObj.state,
					            city: locationObj.city,
					            zipCode: locationObj.zipCode,
					            country: locationObj.country,
					            latlngs: $scope.markers.marker,
					            clickable: false
					        }
					    };

		            });
		        }
		        getLocation();

			});
		}
		findLocation();

		function convertToMeters() {
			$scope.paths.circle.radius = locationService.convertToMeters($scope.paths.circle.miles);
			console.log($scope.paths.circle.radius)
			console.log($scope.location);
			console.log($scope.paths);
		}

		function setLocation() {
			$ionicLoading.show({
				template: 'Saving ' + $scope.location.name + '...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
				duration: 1000
			})
			var locationData = {
				name: $scope.location.name,
				state: $scope.paths.circle.state,
				city:  $scope.paths.circle.city,
				country: $scope.paths.circle.country,
				longitude: $scope.paths.circle.latlngs.lng,
				latitude: $scope.paths.circle.latlngs.lat,
				zipCode:  $scope.paths.circle.zipCode,
				radius: $scope.paths.circle.radius
			}
			homeService.setNewLocation(locationData).then(success, fail)

			function success() {
				// $ionicLoading.hide();
				console.log("It worked");
				$state.go('home');
			}
			function fail() {
				// $ionicLoading.hide();
				console.log("failed");
			}
		}

		
	}
})();