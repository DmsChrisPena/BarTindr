(function(){
	angular
		.module('BarTindrApp')
		.controller("SpotsController", ['$scope', '$http', '$ionicLoading', SpotsController]);

	function SpotsController($scope, $http, $ionicLoading) {
		//Functions
		$scope.getPlaces = getPlaces
		$scope.deleteSpot = deleteSpot;
		$scope.doRefresh = doRefresh();
		//Variables
		$scope.spotsData = {};
		$scope.shouldShowDelete = false;
		$scope.shouldShowReorder = false;
		$scope.listCanSwipe = true;

		$ionicLoading.show({
			template: 'Finding spots...<br />  <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		});
		function doRefresh() {
			getPlaces();
		}

		function deleteSpot(spotId) {
			$ionicLoading.show({
				template: 'Deleting spot...<br />  <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
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
				console.log(data);
			$scope.$broadcast('scroll.refreshComplete');

			}).error(function(data){
				$ionicLoading.hide();
				console.log(data);
			$scope.$broadcast('scroll.refreshComplete');
			});			
		}

		$scope.getPlaces();

	}
})();