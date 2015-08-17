(function() {
	angular
		.module('BarTindrApp')
		.factory('registerService', ['$http', '$window', '$q', registerService]);

	function registerService($http, $window, $q) {
		var service = {};

		service.register = register

		function register(email, password, confirmPassword, userName, radius, isActive) {
			var deferred = $q.defer();

			$http({
				url: 'http://localhost:52355/api/Account/Register',
				method: 'POST',
				data: {
					'email': email, 
					'password': password, 
					'confirmPassword': confirmPassword, 
					'username': userName,
					'radius': radius,
					'isActive': isActive
				}
			}).success(function(data) {
				console.log(data);
				deferred.resolve(data);
			}).error(function(data) {
				console.log(data);
				deferred.reject(data);
			});

			return deferred.promise;
		}

		return service;
	}
})()