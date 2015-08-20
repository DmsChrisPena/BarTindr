(function() {
	angular
		.module('BarTindrApp')
		.factory('locationService', ['$q', '$http', locationService]);

	function locationService($q, $http) {
		var service = {};

		service.convertToMeters = convertToMeters;

		function convertToMeters(miles) {
			var meters = 0;
			meters = miles * 1609.344;
			return meters;
		}


		return service;

	}
})();