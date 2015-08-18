(function() {
	angular
		.module('BarTindrApp')
		.controller('RegisterController', ['$scope', 'registerService', '$ionicPopup', 'loginService', RegisterController]);

	function RegisterController($scope, registerService, $ionicPopup, loginService) {

		$scope.registerUser = registerUser;

		function registerUser() {
			registerService.register(
				$scope.regEmail,
				$scope.regPassword, 
				$scope.regConfirmPassword, 
				$scope.regEmail, 
				15, 
				true).then(success, fail);

			function success(data) {
				$scope.regEmail = '';
				$scope.regPassword = '';
				$scope.regConfirmPassword = '';
				$scope.regEmail	= '';
			}

			function fail(data) {
			}
		}


	}

})();