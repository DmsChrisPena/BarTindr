(function() {
	angular
	.module('BarTindrApp')
	.controller('EditAddressController', ['getLocationService', '$scope', '$stateParams', EditAddressController]);

	function EditAddressController(getLocationService, $scope, $stateParams) {
		$scope.myId = $stateParams.addressId;

		//Functions
		$scope.renderLocationInfo = renderLocationInfo;


		function renderLocationInfo() {

			$scope.editLocationInfo = getLocationService.getLocation();

			$scope.editLocationInfo.miles = $scope.editLocationInfo.radius / 1609.344

		}

		$scope.renderLocationInfo();



	}
})()