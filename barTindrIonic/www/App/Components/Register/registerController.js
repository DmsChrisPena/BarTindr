(function() {
	angular
		.module('BarTindrApp')
		.controller('RegisterController', ['$scope', 'registerService', '$ionicPopup', 'loginService', '$ionicLoading', RegisterController]);

	function RegisterController($scope, registerService, $ionicPopup, loginService, $ionicLoading) {

		$scope.registerUser = registerUser;

		function registerUser() {
            $ionicLoading.show({
				template: 'Making you an awesome account...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
            });
			registerService.register(
				$scope.regEmail,
				$scope.regPassword, 
				$scope.regConfirmPassword, 
				$scope.regEmail, 
				15, 
				true).then(success, fail);

			function success(data) {
				$ionicLoading.hide();
				$scope.regEmail = '';
				$scope.regPassword = '';
				$scope.regConfirmPassword = '';
				$scope.regEmail	= '';
			}

			function fail(data) {
				$ionicLoading.hide();
			}
		}


	}
})();