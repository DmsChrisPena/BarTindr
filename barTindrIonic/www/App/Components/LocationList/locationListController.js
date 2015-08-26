(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationListController', ['$scope', 'locationListService', '$ionicLoading', 'getLocationService', '$state', '$http', LocationListController]);
		
	function LocationListController($scope, locationListService, $ionicLoading, getLocationService, $state, $http) {
		
		//Function
		$scope.changeLocation = changeLocation;




		function changeLocation(locationId) {
			$http({
				method: "POST",
				url: "http://localhost:52355/api/Locations/" + locationId
			}).success(function(data){
				console.log(data);
				loadLocationList();
			}).error(function(data){

			});
		}

		function loadLocationList() {
			$ionicLoading.show({
				template: 'Loading your locations...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
				duration: 1500
			})
			locationListService.getUserInfo().then(success, fail);

			function success(data) {
				$ionicLoading.hide();
				$scope.locations = data;
			}

			function fail(data) {
				$ionicLoading.hide();
				console.log(data);
			}			
		}

		loadLocationList();
		
	}
})();