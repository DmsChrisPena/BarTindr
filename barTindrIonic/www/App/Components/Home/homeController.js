(function() {
	angular
		.module('BarTindrApp')
		.controller('HomeController', ['$scope', 'loginService', '$location', 'homeService', '$timeout', '$state', HomeController]);

	function HomeController($scope, loginService, $location, homeService, $timeout, $state) {

		//Functions
		$scope.logoutUser = logoutUser;

		function logoutUser() {
			loginService.logout();
			$state.go('login');
		}

	}

})();