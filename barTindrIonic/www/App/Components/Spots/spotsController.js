(function(){
	angular
		.module('BarTindrApp')
		.controller("SpotsController", ['$scope', '$http', '$ionicLoading', SpotsController]);

	function SpotsController($scope, $http, $ionicLoading) {
		//Functions
		$scope.getPlaces = getPlaces;

		//Variables
		$scope.spotsData = {};

		$ionicLoading.show({
			template: 'Finding spots...<br /> <img src="img/test.gif" />'
		});

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