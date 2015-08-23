(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationListController', ['$scope', 'locationListService', '$ionicLoading', 'getLocationService', '$state', LocationListController]);
		
	function LocationListController($scope, locationListService, $ionicLoading, getLocationService, $state) {
		$scope.getUserInfo = getUserInfo;
		$scope.editLocation = editLocation;

		function editLocation(location) {
			getLocationService.setLocation(location);
			var locationInfo = getLocationService.getLocation();
			console.log(locationInfo);
			$state.go('location');
		}

		function getUserInfo() {
			$ionicLoading.show({
				template: 'Loading your locations...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
			})
			locationListService.getUserInfo().then(userInfoSuccess, userInfoFail);

			function userInfoSuccess(data) {
				$ionicLoading.hide();
				$scope.locations = data;
				console.log(data);
			}

			function userInfoFail(data) {
				$ionicLoading.hide();
			}
		}
		$scope.getUserInfo();
	}

})();