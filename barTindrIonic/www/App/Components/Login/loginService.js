(function() {
	angular
		.module('BarTindrApp')
		.factory('loginService', ['$http', '$q', '$window', '$location',  '$ionicPopup', loginService]);

	function loginService($http, $q, $window, $location, $ionicPopup) {
		var service = {};

		service.login = login;
		service.logout = logout;

		function login(username, password) {
			var deferred = $q.defer();

			$http({
				url: 'http://turnhere-api.azurewebsites.net/Token',
				method: 'POST',
				data: 'username=' + username + '&password=' + password + '&grant_type=password',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(data) {
				$window.sessionStorage.setItem('token', data.access_token);
				deferred.resolve();
				$location.path('/home')
			}).error(function(data) {
				if(data) {
					$ionicPopup.alert({
						title: '<h5>Invalid Login</h5>',
						template: '<h5 class="text-center">' + data.error_description + '</h5>'
					});
				} else {
					$ionicPopup.alert({
						title: '<h5>Invalid Login</h5>',
						template: '<h5 class="text-center">This one is our bad. Try again!</h5>'
					});
				}

				deferred.reject(data);
			});

			return deferred.promise;
		}



		function logout() {
			$window.sessionStorage.removeItem('token');
		}

		return service;
	}
})();
