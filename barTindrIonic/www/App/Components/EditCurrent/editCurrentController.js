(function() {
	angular
	.module('BarTindrApp')
	.controller('EditCurrentController', ['getLocationService', '$scope', '$stateParams', EditCurrentController]);

	function EditCurrentController(getLocationService, $scope, $stateParams) {
		
		$scope.renderLocationInfo = renderLocationInfo;

		$scope.myId = $stateParams.currentId;


		function renderLocationInfo() {

			$scope.editLocationInfo = getLocationService.getLocation();

			$scope.editLocationInfo.miles = ($scope.editLocationInfo.radius / 1609.433).toFixed(0);

		}

		$scope.renderLocationInfo();



	}
})()