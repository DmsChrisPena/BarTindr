(function() {
	angular
	.module('BarTindrApp')
	.controller('EditCurrentController', ['editCurrentService', '$scope', '$stateParams', '$ionicLoading', 'locationService', '$http', '$state', '$ionicPopup', EditCurrentController]);
	function EditCurrentController(editCurrentService, $scope, $stateParams, $ionicLoading, locationService, $http, $state, $ionicPopup) {
		//Functions
		$scope.getEditInfomation = getEditInfomation;
		$scope.toMeters = toMeters;
		$scope.saveLocation = saveLocation;
		$scope.resetSpots = resetSpots;
		//Variables
		$scope.center = {};
		$scope.markers = {};
		$scope.paths = {};
		$ionicLoading.show({
			template: 'Loading location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		});
		//Get Information by params to edit
		function getEditInfomation() {
			editCurrentService.getEditInfomation($stateParams.currentId).then(getLocationSuccess, getLocationFail);
			function getLocationSuccess(data) {
				$scope.locationInfo = data;
				$scope.locationInfo.miles = ($scope.locationInfo.radius / 1609.344).toFixed(0);
				$ionicLoading.hide();
				console.log(data);
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
			}
			function getLocationFail(data) {
				$ionicLoading.hide();
				console.log(data);
			}			
		}
		function saveLocation() {
			$http({
				method: 'PUT',
				url: "http://localhost:52355/api/locations",
				data: $scope.locationInfo
			}).success(function(data){
				console.log(data);
				$state.go('locationList');
			}).error(function(data){
				console.log(data);
				$state.go('locationList');
			});
		}
		function toMeters() {
			//Checks if location is set
				//Converts the miles to meters for the leaflet map also saves the current set radius
				$scope.locationInfo.radius = locationService.convertToMeters($scope.locationInfo.miles);
				$scope.paths.circle.radius = locationService.convertToMeters($scope.locationInfo.miles);
		}
		function resetSpots(locationId) {
			var confirmPopup = $ionicPopup.confirm({
		     title: '<h4>Reset Spots</h4>',
		     template: '<p class="text-center">Are you sure you want to reset your spots?</p>' 
		   });
		   confirmPopup.then(function(res) {
		     if(res) {
				$http({
					method: 'DELETE',
					url: 'http://localhost:52355/api/activePlaces/' + locationId
				}).success(function(data){
					console.log('it worked', data);
					$scope.getEditInfomation();
				}).error(function(data){
					console.log('it didn\'t work', data);
				});
		     }
		 })
		}

		$scope.getEditInfomation();
	}
})();