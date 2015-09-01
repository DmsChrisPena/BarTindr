(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationController', ['$scope', 'locationService', '$ionicLoading', '$state', '$ionicPopup', 'getLocationService', LocationController]);
		
	function LocationController($scope, locationService, $ionicLoading, $state, $ionicPopup, getLocationService) {

		//Functions
		$scope.convertToMeters = convertToMeters;
		$scope.findLocation = findLocation;
		$scope.saveLocation = saveLocation;

		locationService.findGeolocation().then(function(data){
			console.log(data);
		}, function(data){
			console.log(data);
		});

		//Variables
		$scope.center = {};
		$scope.paths = {};
		$scope.locationInfo = {};
		$ionicLoading.show({
			template: 'Finding location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		});

		function findLocation() {
			//Find current location
			locationService.findGeolocation().then(geolocationSuccess, geolocationFail);


			function geolocationSuccess(position) {

				//Get all the location information
				locationService.reverseGeo(position).then(reverseSuccess, reverseFail);

				function reverseSuccess(geocode) {
					$ionicLoading.hide();

					//Define leaflet map center
					$scope.center = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						zoom: 10
					};

					$scope.markers = {
						marker: {
							draggable: false,
							message: $scope.locationInfo.name,
							lat: position.coords.latitude,
							lng: position.coords.longitude,
							icon: {}
						}
					};

					$scope.paths = {
						circle: {
							type: 'circle',
							radius: 16093.44,
							miles: 10,
							latlngs: $scope.markers.marker,
							clickable: false
						}
					};


					//Format the address
					var formattedGeocode = locationService.addressFormatter(geocode);


					//Sets name
					$scope.locationName = formattedGeocode.name;

					//Define object to be saved to database
					$scope.locationInfo = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						name: formattedGeocode.name,
						address: formattedGeocode.address,
						city: formattedGeocode.city,
						state: formattedGeocode.state,
						country: formattedGeocode.country,
						zipCode: formattedGeocode.zipCode,
						radius: $scope.paths.circle.radius,
						isCurrentLocation: true
					};

				}

				function reverseFail(err) {
					console.log(err);
				}
			}

			//Cannot find location
			function geolocationFail(err) {
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: '<h5>Error Locating</h5>',
					template: '<h5 class="text-center">' + err + '</h5>'
				});
			}

		}

		$scope.findLocation();		

		function convertToMeters() {
			//Converts the miles to meters for the leaflet map
			$scope.paths.circle.radius = locationService.convertToMeters($scope.paths.circle.miles);
			//Updates the radius for our main data object	
			$scope.locationInfo.radius = $scope.paths.circle.radius;
		}

		function saveLocation() {
			//Is loading for the save function
			$ionicLoading.show({
				template: 'Saving ' + $scope.locationInfo.name + '...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
				duration: 1000
			});
			
			locationService.setNewLocation($scope.locationInfo).then(saveSuccess, saveFail);

			function saveSuccess() {
				$ionicLoading.hide();
				$state.go('home');
			}
			function saveFail() {
				$ionicLoading.hide();
				$state.go('home');
				$ionicPopup.alert({
					title: '<h5>Could Not Save</h5>',
					template: '<h5 class="text-center">Location couldn\'t save. Please try again!</h5>'
				});

			}
		}

		
	}

})();