(function() {
	angular
		.module('BarTindrApp')
		.config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$httpProvider', Config]);


	function Config($stateProvider, $routeProvider, $urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: 'App/Components/Login/loginView.html',
				controller: 'LoginController'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'App/Components/Register/registerView.html',
				controller: 'RegisterController'
			});


		$httpProvider.interceptors.push('authService');
	}

})();