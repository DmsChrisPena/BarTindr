(function() {
	angular
	.module('BarTindrApp')
	.controller('EditAddressController', ['editCurrentService', '$scope', '$stateParams', '$ionicLoading', EditAddressController]);

	function EditAddressController(editCurrentService, $scope, $stateParams, $ionicLoading) {
		//Functions
		$scope.getEditInfomation = getEditInfomation;
		$scope.disableTap = disableTap;

		$ionicLoading.show({
			template: 'Loading location...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
		});


		function disableTap() {
		    container = document.getElementsByClassName('pac-container');
		    angular.element(container).attr('data-tap-disabled', 'true');

		    angular.element(container).on("click", function(){
		        document.getElementById('locationSearch').blur();
		    });
		}


		//Get Information by params to edit
		function getEditInfomation() {
			editCurrentService.getEditInfomation($stateParams.addressId).then(getLocationSuccess, getLocationFail);

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