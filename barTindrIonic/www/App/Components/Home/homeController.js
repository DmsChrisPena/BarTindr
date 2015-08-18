(function() {
	angular
		.module('BarTindrApp')
		.controller('HomeController', ['$scope', 'loginService', '$location', HomeController]);

	function HomeController($scope, loginService, $location) {
		$scope.logoutUser = logoutUser;

			function logoutUser() {
				loginService.logout();
				$location.path('/');
		};
	}

})();