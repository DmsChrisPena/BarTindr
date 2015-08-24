(function() {
	angular
	.module('BarTindrApp')
	.controller('EditAddressController', ['editCurrentService', '$scope', '$stateParams', '$ionicLoading', 'locationService', '$http', '$ionicPopup', EditAddressController]);

	function EditAddressController(editCurrentService, $scope, $stateParams, $ionicLoading, locationService, $http, $ionicPopup) {
		//Functions
		$scope.getEditInfomation = getEditInfomation;
		$scope.disableTap = disableTap;
		$scope.clearLocation = clearLocation;
		$scope.findLocation = findLocation;
		$scope.toMeters = toMeters;
		$scope.promptNameChange = promptNameChange;

		//Variables
		$scope.center = {};
		$scope.markers = {};
		$scope.paths = {};
		$scope.locationMiles = {

		};

		$ionicLoading.show({
			template: 'Loading location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		});

		function clearLocation() {
			$scope.locationInfo.fullAddress = "";
		}

		function disableTap() {
		    container = document.getElementsByClassName('pac-container');
		    angular.element(container).attr('data-tap-disabled', 'true');

		    angular.element(container).on("click", function(){
		        document.getElementById('locationSearch').blur();
		    });
		}

		function findLocation() {
			if($scope.locationInfo.fullAddress != undefined && $scope.locationInfo.fullAddress != "" && $scope.locationInfo.fullAddress != null) {
				$ionicLoading.show({
					template: 'Finding location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
				})
				$http({
					method: "GET",
					url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + $scope.locationInfo.fullAddress.replace(/ /g, "+") + "&key=AIzaSyCMNnhspsI29RamXbhSD-qiV06PoXOIH7o"
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
							name: $scope.addressLocationName,
							address: formattedGeocode.address,
							city: formattedGeocode.city,
							state: formattedGeocode.state,
							country: formattedGeocode.country,
							zipCode: formattedGeocode.zipCode,
							radius:   $scope.locationMiles.miles * 1609.344,
							fullAddress: $scope.locationInfo.fullAddress,
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
							radius:  $scope.locationMiles.miles * 1609.344,
							latlngs: $scope.markers.marker,
							clickable: false
						}
					};

				console.log($scope.locationInfo);

				}).error(function(data) {
					$ionicLoading.hide();
				});
			}
		}

		function promptNameChange() {
			  $ionicPopup.show({
			    template: '<input type="text" placeholder="Enter Name..." ng-model="$parent.addressLocationName">',
			    title: 'Change Location Name',
			    subTitle: "i.e. Home, Work, College",
			    scope: $scope,
			    buttons: [
			      { text: 'Cancel',
			      	onTap: function() {
			      		$scope.addressLocationName = $scope.locationInfo.name;
			      		return false;
			      	} },
			      {
			        text: '<b>Save</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			          return $scope.addressLocationName;
			        }
			      }
			    ]
			  }).then(function(res) {
			  	if(res) {
			  		$scope.locationInfo.name = res;
				  }

			  });
		}

		function toMeters() {
			//Checks if location is set
			if($scope.center.lat) {
				//Converts the miles to meters for the leaflet map also saves the current set radius
				$scope.locationInfo.radius = locationService.convertToMeters($scope.locationMiles.miles);
				$scope.paths.circle.radius = locationService.convertToMeters($scope.locationMiles.miles);
			} else {
				$scope.locationInfo.radius = locationService.convertToMeters($scope.locationMiles.miles);
			}
		}

		//Get Information by params to edit
		function getEditInfomation() {
			editCurrentService.getEditInfomation($stateParams.addressId).then(getLocationSuccess, getLocationFail);

			function getLocationSuccess(data) {
				$scope.locationInfo = data;
				$scope.addressLocationName = data.name;

				$ionicLoading.hide();
				//Define leaflet map center
				$scope.center = {
					lat: $scope.locationInfo.latitude,
					lng: $scope.locationInfo.longitude,
					zoom: 10
				};

				$scope.markers = {
					marker: {
						draggable: false,
						message: $scope.locationInfo.name,
						lat: $scope.locationInfo.latitude,
						lng: $scope.locationInfo.longitude,
						icon: {}
					}
				};

				$scope.paths = {
					circle: {
						type: 'circle',
						radius: $scope.locationInfo.radius,
						latlngs: $scope.markers.marker,
						clickable: false
					}
				};

				$scope.fullAddress = $scope.locationInfo.address + ", " + $scope.locationInfo.city + ", " + $scope.locationInfo.state + ", " + $scope.locationInfo.country;

				$scope.locationMiles.miles = ($scope.locationInfo.radius / 1609.344).toFixed(0);

				console.log($scope.fullAddress);
				console.log(data);
			}

			function getLocationFail(data) {
				$ionicLoading.hide();
				console.log(data);
			}			
		}

		$scope.getEditInfomation();
	}
})()