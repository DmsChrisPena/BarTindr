(function() {
	angular
	.module('BarTindrApp')
	.factory('editCurrentService', ['$http', '$q', editCurrentService]);

	function editCurrentService($http, $q) {
		var service = {};

		service.getEditInfomation = getEditInfomation;

		function getEditInfomation(locationId) {
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: 'http://localhost:52355/Api/Locations/' + locationId
			}).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			}); 

			return deferred.promise
		}

		return service;
	}
})();