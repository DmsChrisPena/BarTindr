(function(){
	angular
		.module('BarTindrApp')
		.controller("SpotsController", ['$scope', '$http', '$ionicLoading', SpotsController]);

	function SpotsController($scope, $http, $ionicLoading) {
		//Functions
		$scope.getPlaces = getPlaces
		$scope.deleteSpot = deleteSpot;
		
		//Variables
		$scope.spotsData = {};
		$scope.shouldShowDelete = false;
		$scope.shouldShowReorder = false;
		$scope.listCanSwipe = true;

		$ionicLoading.show({
			template: 'Finding spots...<br /> <img src="img/test.gif" />'
		});

		function deleteSpot(spotId) {
			$ionicLoading.show({
				template: 'Deleting spot...<br /> <img src="img/test.gif" />'
			});			
			$http({
				method: 'DELETE',
				url: 'http://localhost:52355/api/places/' + spotId
			}).success(function(data){
				$scope.getPlaces();
				$ionicLoading.hide();
				$scope.spotsData = data;
			}).error(function(data){
				$ionicLoading.hide();
				console.log(data);
			});				
		}

		function getPlaces() {
			$http({
				method: 'GET',
				url: 'http://localhost:52355/api/activePlaces/'
			}).success(function(data){
				$ionicLoading.hide();
				$scope.spotsData = data;
			}).error(function(data){
				$ionicLoading.hide();
				console.log(data);
			});			
		}

		$scope.getPlaces();

	}
})();