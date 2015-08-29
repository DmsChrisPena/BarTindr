(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationAddressController', ['$scope', 'locationService', '$http', 'leafletData', '$state', '$ionicPopup', '$ionicLoading', 'locationAddressService', LocationAddressController]);

	function LocationAddressController($scope, locationService, $http, leafletData, $state, $ionicPopup, $ionicLoading, locationAddressService) {

		//Functions
		$scope.disableTap = disableTap;
		$scope.findLocation = findLocation;
		$scope.toMeters = toMeters;
		$scope.clearLocation = clearLocation;
		$scope.promptCreateName = promptCreateName;
		$scope.saveLocation = saveLocation;

		//Variables... I'm so dumb.
		$scope.center = {};
		$scope.markers = {};
		$scope.paths = {};
		$scope.locationInfo = {};
		$scope.promptLocation = {};
		$scope.miles = {
			value: 10
		};
		$scope.converted = {
			radius: 16093.44
		};
		$scope.locationResult = "";


		function disableTap() {
		    container = document.getElementsByClassName('pac-container');
		    angular.element(container).attr('data-tap-disabled', 'true');

		    angular.element(container).on("click", function(){
		        document.getElementById('locationSearch').blur();
		    });
		}


		function clearLocation() {
			$scope.locationResult = "";
		}

		function findLocation() {
			if($scope.locationResult != "") {
				$ionicLoading.show({
					template: 'Finding location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
				})
				$http({
					method: "GET",
					url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + $scope.locationResult + "&key=AIzaSyCMNnhspsI29RamXbhSD-qiV06PoXOIH7o"
				}).success(function(data) {
					var longlat = data.results[0].geometry.location;
					var posObj = {
						coords: {
							latitude: longlat.lat,
							longitude: longlat.lng
						}
					};

					//Get all the location information
					locationService.reverseGeo(posObj).then(reverseSuccess, reverseFail);

					function reverseSuccess(geocode) {
						$ionicLoading.hide();

						//Format the address
						var formattedGeocode = locationService.addressFormatter(geocode);

						//Define object to be saved to database
						$scope.locationInfo = {
							latitude: posObj.coords.latitude,
							longitude: posObj.coords.longitude,
							name: $scope.locationResult,
							address: formattedGeocode.address,
							city: formattedGeocode.city,
							state: formattedGeocode.state,
							country: formattedGeocode.country,
							zipCode: formattedGeocode.zipCode,
							fullAddress: $scope.locationResult,
							radius:   16093.44,
							isCurrentLocation: false
						};
					}

					function reverseFail(data) {
						$ionicLoading.hide();
						console.log(data);
					}

					//Define leaflet map center
					$scope.center = {
						lat: longlat.lat,
						lng: longlat.lng,
						zoom: 10
					};

					$scope.markers = {
						marker: {
							draggable: false,
							message: $scope.locationResult,
							lat: longlat.lat,
							lng: longlat.lng,
							icon: {}
						}
					};

					$scope.paths = {
						circle: {
							type: 'circle',
							radius: $scope.converted.radius,
							latlngs: $scope.markers.marker,
							clickable: false
						}
					};


				}).error(function(data) {
					console.log(data);
				});
			}

		}

		function toMeters() {
			//Checks if location is set
			if($scope.center.lat) {
				//Converts the miles to meters for the leaflet map also saves the current set radius
				$scope.converted.radius = locationService.convertToMeters($scope.miles.value);
				$scope.paths.circle.radius = locationService.convertToMeters($scope.miles.value);
				$scope.locationInfo.radius = $scope.converted.radius;
			} else {
				$scope.converted.radius = locationService.convertToMeters($scope.miles.value);
			}
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

		function promptCreateName() {
			if(!$scope.center.lat && $scope.locationResult) {
				$scope.findLocation();
			}

			if(!$scope.locationResult) {
				$ionicPopup.alert({
					title: '<h5>Invalid Location</h5>',
					template: '<h5 class="text-center">Please enter a location.</h5>'
				});
			} else {
			  $ionicPopup.show({
			    template: '<input type="text" placeholder="'+ $scope.locationResult +'" ng-model="promptLocation.name">',
			    title: 'Create a location name',
			    subTitle: "i.e. Home, Work, College",
			    scope: $scope,
			    buttons: [
			      { text: 'Cancel',
			      	onTap: function() {
			      		return false;
			      	} },
			      {
			        text: '<b>Save</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			          if (!$scope.promptLocation.name) {
			          	return $scope.locationResult;
			            e.preventDefault();
			          } else {
			            return $scope.promptLocation.name;
			          }
			        }
			      }
			    ]
			  }).then(function(res) {
			  	if(res) {
			  		$scope.locationInfo.radius = $scope.converted.radius;
				  	$scope.locationInfo.name = res;
				  	$scope.saveLocation();
					$scope.center = {};
					$scope.markers = {};
					$scope.paths = {};
					$scope.locationResult = "";
				  }

			  });

			}
		}
		
	}

})();