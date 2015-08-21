(function() {
	angular
		.module('BarTindrApp')
		.config(['$stateProvider', '$routeProvider', '$urlRouterProvider', '$httpProvider', Config])
		.run(['$rootScope', '$window', '$location', LoginCheck])

	//Checks if user is logged in and routes them to the right views
	function LoginCheck($rootScope, $window, $location) {
		$rootScope.$on('$stateChangeSuccess', function(event, next, current) {
			var userAuthed = $window.sessionStorage.getItem('token');

			if(userAuthed) {
				if(next.url =='/') {
					$location.path('/home');
				}
				if(next.url == '/register') {
					$location.path('/home');
				}
			} else {
				if(next.url != '/register' && '/') {
					$location.path('/')
				}
			}
		});
	};


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
			})
			.state('home', {
				url: '/home',
				templateUrl: 'App/Components/Home/homeView.html',
				controller: 'HomeController'
			})
			.state('location', {
				url: '/location',
				templateUrl: 'App/Components/Location/locationView.html',
				controller: 'LocationController'
			})
			.state('locationList', {
				url: '/locationList',
				templateUrl: 'App/Components/LocationList/locationListView.html',
				controller: 'LocationListController'
			});


		$httpProvider.interceptors.push('authService');
	}

})();