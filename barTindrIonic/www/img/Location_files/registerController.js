(function() {
	angular
		.module('BarTindrApp')
		.controller('RegisterController', ['$scope', 'registerService', '$ionicPopup', 'loginService', '$ionicLoading', RegisterController]);

	function RegisterController($scope, registerService, $ionicPopup, loginService, $ionicLoading) {
		//Functoins
		$scope.registerUser = registerUser;
		$scope.showPassword = showPassword;

		//Variables
		$scope.passwordHidden = true;
		$scope.passwordField = "password";

		function registerUser() {
            $ionicLoading.show({
				template: 'Making you an awesome account...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
            });
			registerService.register(
				$scope.regEmail,
				$scope.regPassword, 
				true).then(success, fail);

			function success(data) {
				$ionicLoading.hide();
				$scope.regEmail = '';
				$scope.regPassword = '';
			}

			function fail(data) {
				$ionicLoading.hide();
			}
		}


		function showPassword() {
			$scope.passwordHidden = !$scope.passwordHidden;

			if($scope.passwordHidden == true) {
				$scope.passwordField = "password";
			} else {
				$scope.passwordField = "text";
			}
		}


	}
})();