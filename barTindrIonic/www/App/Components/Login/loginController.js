(function() {
	angular
		.module('BarTindrApp')
		.controller('LoginController', ['$scope', 'loginService', '$window', '$ionicPopup', LoginController]);

	function LoginController($scope, loginService, $window, $ionicPopup) {

		$scope.loginUser = loginUser;
		$scope.getUser = getUser;


		function loginUser() {
			if($window.sessionStorage.getItem('token') != null) {
			} else {
				
				loginService.login($scope.email, $scope.password).then(success, fail);

				function success(data) {
				}

				function fail(data) {
				}
			}
		}

		function getUser() {
			loginService.getUserInfo().then(success,fail);

			function success(data) {
				console.log(data);
			}

			function fail(data) {
				console.log(data);
			}
		}

	}

})();