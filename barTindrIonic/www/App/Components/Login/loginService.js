(function() {
	angular
		.module('BarTindrApp')
		.factory('loginService', ['$http', '$q', '$window', '$location',  '$ionicPopup', loginService]);

	function loginService($http, $q, $window, $location, $ionicPopup) {
		var service = {};

		service.login = login;
		service.getUserInfo = getUserInfo;

		function login(username, password) {
			var deferred = $q.defer();

			$http({
				url: 'http://localhost:52355/Token',
				method: 'POST',
				data: 'username=' + username + '&password=' + password + '&grant_type=password',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(data) {
				console.log(data);
				$window.sessionStorage.setItem('token', data.access_token);
				deferred.resolve();
				$location.path('/home')
			}).error(function(data) {
				$ionicPopup.alert({
					title: '<h5>Invalid Login</h5>',
					template: '<h5 class="text-center">' + data.error_description + '</h5>'
				});
				deferred.reject(data);
			});

			return deferred.promise;
		}

		function getUserInfo() {
			var deferred = $q.defer();

			$http({
				url: 'http://localhost:52355/api/user',
				method: 'GET',
				header: { 'Authorization': 'Bearer ' + $window.sessionStorage.getItem('token') }
			}).success(function(data) {
				deferred.resolve(data)
			}).error(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		}

		return service;
	}
})();
