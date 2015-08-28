(function() {
	angular
		.module('BarTindrApp')
		.controller('HomeController', ['$scope', 'loginService', '$location', 'homeService', '$timeout', '$state', HomeController]);

	function HomeController($scope, loginService, $location, homeService, $timeout, $state) {

		//Functions
		$scope.logoutUser = logoutUser;
		$scope.footerExpand = footerExpand;
		$scope.footerCollapse = footerCollapse;

		function logoutUser() {
			loginService.logout();
			$state.go('login');
		}

		function footerExpand() {
			console.log("Footer Expanded");
		}

		function footerCollapse() {
			console.log("Footer Collapsed");
		}
	}

})();