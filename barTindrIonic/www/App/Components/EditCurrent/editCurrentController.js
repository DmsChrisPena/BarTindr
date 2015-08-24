(function() {
	angular
	.module('BarTindrApp')
	.controller('EditCurrentController', ['editCurrentService', '$scope', '$stateParams', '$ionicLoading', EditCurrentController]);

	function EditCurrentController(editCurrentService, $scope, $stateParams, $ionicLoading) {

		$scope.getEditInfomation = getEditInfomation;
		$ionicLoading.show({
			template: 'Loading location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		});

		//Get Information by params to edit
		function getEditInfomation() {
			editCurrentService.getEditInfomation($stateParams.currentId).then(getLocationSuccess, getLocationFail);

			function getLocationSuccess(data) {
				$scope.locationInfo = data;
				$ionicLoading.hide();
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