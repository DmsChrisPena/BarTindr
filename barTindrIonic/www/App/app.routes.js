(function() {
	angular
		.module('BarTindrApp')
		.config(['$stateProvider', '$routeProvider', '$urlRouterProvider', Config]);


	function Config($stateProvider, $routeProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: 'App/Components/Login/loginView.html'
			});
	}

})();