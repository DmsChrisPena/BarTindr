(function() {
	angular
		.module('BarTindrApp')
		.controller('LoginController', ['$scope', 'loginService', '$window', '$ionicPopup', '$ionicLoading', LoginController]);

	function LoginController($scope, loginService, $window, $ionicPopup, $ionicLoading) {

		$scope.loginUser = loginUser;
		$scope.logoutUser = logoutUser;


		function loginUser() {
			if($window.sessionStorage.getItem('token') != null) {
			} else {
				$ionicLoading.show({
					template: 'Logging in...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
				})
				loginService.login($scope.email, $scope.password).then(success, fail);

				function success(data) {
					$ionicLoading.hide();
					$scope.email = '';
					$scope.password = '';
				}

				function fail(data) {
					$ionicLoading.hide();
					$scope.password = '';
				}
			}
		}

		function logoutUser() {
			loginService.logout();
		}



	}

})();