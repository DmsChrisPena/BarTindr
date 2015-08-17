(function() {
	angular
		.module('BarTindrApp')
		.controller('RegisterController', ['$scope', 'registerService', RegisterController]);

	function RegisterController($scope, registerService) {

		$scope.registerUser = registerUser;

		function registerUser() {
			registerService.register($scope.regEmail, $scope.regPassword, $scope.regConfirmPassword, $scope.regEmail, 15, true).then(success, fail);

			function success() {
				console.log("IT WORKED!");
			}

			function fail() {
				console.log("It didn't work");
			}
		}


	}

})();