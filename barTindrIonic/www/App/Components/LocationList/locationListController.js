(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationListController', ['$scope', 'locationListService', '$ionicLoading', 'getLocationService', '$state', 'userInfo', '$http', LocationListController]);
		
	function LocationListController($scope, locationListService, $ionicLoading, getLocationService, $state, userInfo, $http) {
		// $scope.getUserInfo = getUserInfo;
		$scope.setLocation = setLocation;
		function setLocation(loc) {
			getLocationService.setLocation(loc);
		}
		// function getUserInfo() {
		// 	$ionicLoading.show({
		// 		template: 'Loading your locations...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		// 	})
		// 	locationListService.getUserInfo().then(userInfoSuccess, userInfoFail);
		// 	function userInfoSuccess(data) {
		// 		$ionicLoading.hide();
		// 		$scope.locations = data;
		// 		console.log(data);
		// 	}
		// 	function userInfoFail(data) {
		// 		$ionicLoading.hide();
		// 	}
		// }
		$scope.locations = userInfo;
		console.log(userInfo);
		
	}
})();