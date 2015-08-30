(function() {
	angular
		.module('BarTindrApp')
		.factory('introService', ['$http', '$q', introService]);

	function introService($http, $q){
		var service = {};
			
		return service;
	}
	
})();