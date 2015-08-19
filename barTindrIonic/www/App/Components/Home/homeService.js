(function() {
	angular
		.module('BarTindrApp')
		.factory('homeService', ['$http', '$q', homeService]);

	function homeService($http, $q){
		var service = {};
		
		service.setNewLocation = setNewLocation;

		function setNewLocation(location) {
			var deferred = $q.defer();
			$http({
				url: "http://localhost:52355/api/locations",
				method: "POST",
				data: location
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		}

		return service;
	}
	
})();