(function(){
	angular
		.module('BarTindrApp')
		.controller("SpotsController", ['$scope', '$http', '$ionicLoading', '$ionicActionSheet', SpotsController]);

	function SpotsController($scope, $http, $ionicLoading, $ionicActionSheet) {
		//Functions
		$scope.getPlaces = getPlaces
		$scope.deleteSpot = deleteSpot;
		$scope.doRefresh = doRefresh;
		$scope.routeMe = routeMe;
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

		 function routeMe(lat, lng, fullAdd) {
		 		console.log(lat, lng, fullAdd);
				// Show the action sheet
			   var hideSheet = $ionicActionSheet.show({
			     buttons: [
			       { text: 'Route Me' },
			       { text: 'Uber Me' }
			     ],
			     titleText: 'Route',
			     cancelText: 'Cancel',
			     cancel: function() {
			          // add cancel code..
			        },
			     buttonClicked: function(index) {
			     	if(index === 1) {
			     		window.location = "http://maps.apple.com/?daddr=" + fullAdd;
			     		window.location = "comgooglemaps://?saddr=" + fullAdd
			       		return true;
			     	}
			     	if(index === 0) {
			     		window.location = "https://m.uber.com/sign-up?client_id=b32fu5Np2wwoGBN5goMySgxP6A36BOCw&dropoff_latitude=" + lat + "&dropoff_longitude=" + lng + "&dropoff_nickname=" + fullAdd + "&dropoff_address=" + fullAdd
			     		return true;
			     	}
			       return true;

			     }
			   });    	
		    }

		$scope.getPlaces();

	}
})();