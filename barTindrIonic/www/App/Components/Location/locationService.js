(function() {
	angular
		.module('BarTindrApp')
		.factory('locationService', ['$q', '$http', locationService]);

	function locationService($q, $http) {
		var service = {};

		service.convertToMeters = convertToMeters;
		service.setNewLocation = setNewLocation;
		service.findGeolocation = findGeolocation;
		service.reverseGeo = reverseGeo;
		service.addressFormatter = addressFormatter;


		function addressFormatter(address) {
			var _regex = /^([^,]+)\s*,\s*([^,]+)\s*,\s*(\w{2})\s*(\d{5})\s*,\s*(.*)$/
			var _addressArray = address[0].formatted_address.match(_regex).splice(1);
			var addressObject = {
				name: _addressArray[1] + ", " + _addressArray[2],
				address: _addressArray[0],
				city: _addressArray[1],
				country: _addressArray[4],
				state: _addressArray[2],
				zipCode: _addressArray[3]
			}
			return addressObject;
		}

		function reverseGeo(posObj) {
			var deferred = $q.defer();

			var geocoder = new google.maps.Geocoder();
		    var latlng = new google.maps.LatLng(posObj.coords.latitude, posObj.coords.longitude);
		    geocoder.geocode({ 'latLng': latlng }, function (results, status) { 
		    	if(status === "OK") {
		    		deferred.resolve(results);
		    	} else {
		    		deferred.reject("Could not reverse geocode... Whatever that means");
		    	}
		    });

		    return deferred.promise;
		}

		function findGeolocation() {
			var deferred = $q.defer();
			navigator.geolocation.getCurrentPosition(success, fail);

			function success(position) {
				deferred.resolve(position);
			}

			function fail() {
				deferred.reject("We could not find your location... Try again.");
			}

			return deferred.promise;
		}


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

		function convertToMeters(miles) {
			var meters = 0;
			meters = miles * 1609.344;
			return meters;
		}


		return service;

	}
})();