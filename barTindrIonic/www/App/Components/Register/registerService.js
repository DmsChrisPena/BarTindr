(function() {
	angular
		.module('BarTindrApp')
		.factory('registerService', ['$http', '$window', '$q', '$ionicPopup', '$location', registerService]);

	function registerService($http, $window, $q, $ionicPopup, $location) {
		var service = {};

		service.register = register

		function register(email, password, confirmPassword, userName, isActive) {
			var deferred = $q.defer();

			$http({
				url: 'http://localhost:52355/api/Account/Register',
				method: 'POST',
				data: {
					'email': email, 
					'password': password, 
					'confirmPassword': confirmPassword, 
					'username': userName,
					'isActive': isActive
				}
			}).success(function(data) {
				//Need to login them in and set session token but can't because I hate CORS

				$location.path('/');
				deferred.resolve(data);
			}).error(function(data) {
				if(data != null) {
					var errorMessage = [];

					for(var dat in data.modelState) {
						errorMessage.push(data.modelState[dat][0]);
					}

					$ionicPopup.alert({
						title: '<h4>Registration Error</h4>',
						template: '<h5 class="text-center">' + errorMessage.join('<br/>') + '</h5>'
					});
					deferred.reject(data);
				} else {

					$ionicPopup.alert({
						title: '<h4>Registration Error</h4>',
						template: '<h5 class="text-center">Geez, Our registration isnt working. Try again!</h5>'
					});
					deferred.reject();
				}
			});

			return deferred.promise;
		}

		return service;
	}
})()