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
		};
		$scope.formattedAddress = [];

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

						function addressArray(address) {
			            	var regex = /^([^,]+)\s*,\s*([^,]+)\s*,\s*(\w{2})\s*(\d{5})\s*,\s*(.*)$/
			            	return address[0].formatted_address.match(regex).splice(1);
						}
		            	$scope.formattedAddress = addressArray(results);

		        		$scope.location = {
		        			name: $scope.formattedAddress[1] + ", " + $scope.formattedAddress[2]
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
		}

		function setLocation() {
			$ionicLoading.show({
				template: 'Saving ' + $scope.location.name + '...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
				duration: 1000
			})
			var locationData = {
				name: $scope.location.name,
				address: $scope.formattedAddress[0],
				city: $scope.formattedAddress[1],
				country: $scope.formattedAddress[4],
				state: $scope.formattedAddress[2],
				longitude: $scope.paths.circle.latlngs.lng,
				latitude: $scope.paths.circle.latlngs.lat,
				zipCode:  $scope.formattedAddress[3],
				radius: $scope.paths.circle.radius
			}
			
			homeService.setNewLocation(locationData).then(success, fail)

			function success() {
				$ionicLoading.hide();
				console.log("It worked");
				$state.go('home');
			}
			function fail() {
				$ionicLoading.hide();
				console.log("failed");
			}
		}

		
	}
})();