(function(){
	angular
		.module('BarTindrApp')
		.controller('FoodController', ['$http', '$scope', '$q', '$ionicLoading', FoodController]);

	function FoodController($http, $scope, $q, $ionicLoading) {
		
		//Functions
		$scope.getPlaces = getPlaces;
		$scope.likePlace = likePlace;
		$scope.getSpots = getSpots;

		//Variables
		$scope.everythingWeNeed = [];

		function getPlaces(lat, lng, radius, section) {
			var promises = [];
			
			var clientInfo = {
				clientId: 'QVSPFCY2CMP0LWO1NDRQIBN523IOX22IYTQGG02RSIJTJTOE',
				clientSecret: '3MKDIXJAHAVOPV2YLIROCEQG1WXBWUXVYUIFCOGSOISHA1GD',
				version: '20150822'
			}

			$ionicLoading.show({
				template: 'Finding grub... Stay hungry my friend<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
			});


			$.ajax({
				method: "GET",
				url: 'https://api.foursquare.com/v2/venues/explore?ll=' 
					+ lat + ',' 
					+ lng + 
					'&section=' + section 
					+ '&venuePhotos=1&radius=' + radius 
					+ '&offset=0&limit=50&client_id=QVSPFCY2CMP0LWO1NDRQIBN523IOX22IYTQGG02RSIJTJTOE&client_secret=3MKDIXJAHAVOPV2YLIROCEQG1WXBWUXVYUIFCOGSOISHA1GD&v=20150822'
			}).success(function(data){
				$scope.getSpots();
				console.log(data);
				var totalResults = Math.trunc(parseInt((data.response.totalResults/50)) + 1);
				for(i = 0; i < totalResults; i++){
					promises.push($.ajax({
						method: 'GET', 
						url: 'https://api.foursquare.com/v2/venues/explore?ll=' 
						+ lat + ',' 
						+ lng + 
						'&section=' + section 
						+ '&venuePhotos=1&radius=' + radius 
						+ '&offset=' + (i * 50) + '&limit=50' 
						+ '&client_id=QVSPFCY2CMP0LWO1NDRQIBN523IOX22IYTQGG02RSIJTJTOE&client_secret=3MKDIXJAHAVOPV2YLIROCEQG1WXBWUXVYUIFCOGSOISHA1GD&v=20150822'
					}));
				}
				$q.all(promises).then(success, fail);

				var placeInfo = {};
				function success(data) {
					console.log(data);
					data.forEach(function(dat) {
						dat.response.groups[0].items.forEach(function(da) {
							placeInfo = {
								name: da.venue.name,
								rating: da.venue.rating,
								hours: da.venue.hours,
								phone: da.venue.contact.formattedPhone,
								address: da.venue.location.address,
								city: da.venue.location.city,
								state: da.venue.location.state,
								zip: da.venue.location.postalCode,
								crossStreet: da.venue.location.crossStreet,
								fullAddress: da.venue.location.formattedAddress[0] + " " +  da.venue.location.formattedAddress[1],
								distance: da.venue.location.distance,
								latitude: da.venue.location.lat,
								longitude: da.venue.location.lng,
								websiteUrl: da.venue.url,
								tier: da.venue.price,
								category: da.venue.categories[0].name,
								imageUrl: da.venue.featuredPhotos
	 						};
	 						$scope.everythingWeNeed.push(placeInfo);
						})
					})
					$ionicLoading.hide();
					console.log($scope.everythingWeNeed);
				}

				function fail(data) {
					console.log(data);
					$ionicLoading.hide();
				} 	
			})
		}

		function likePlace(vm, isLiked, isDisliked, canonicalName) {
			vm.isLiked = isLiked;
			vm.isDisliked = isDisliked;
			vm.canonicalName = canonicalName;
			$http({
				method: "POST",
				url: "http://localhost:52355/api/Places/",
				data: vm
			}).success(function(data){
				$scope.getSpots();
				console.log(data);
			}).error(function(data){
				console.log(data);
				$scope.getSpots();

			});
		}

		$http({
			method: 'GET',
			url: "http://localhost:52355/api/places"
		}).success(function(data){
			console.log(data);
			getPlaces(data.locations[0].latitude, data.locations[0].longitude, data.locations[0].radius, 'food');
		}).error(function(data){
			console.log(data);
		});	

		function getSpots() {
			$http({
				method: 'GET',
				url: 'http://localhost:52355/api/activePlaces/'
			}).success(function(data){
				$scope.spotsData = data;
				console.log(data);
			}).error(function(data){
				console.log(data);
			});			
		}




    $scope.cardDestroyed = function(index) {
      $scope.everythingWeNeed.splice(index, 1);
    };

    $scope.cardSwiped = function(index) {
      var newCard = { name: "Tommy"};
      $scope.everythingWeNeed.push(newCard);
    }; 

    $scope.cardSwipedLeft = function(card) {
    	console.log('swipe left', card);
    	likePlace(card, false, true, 'food');
    }

    $scope.cardSwipedRight = function(card) {
    	console.log('swipe right', card);
    	likePlace(card, true, false, 'food');
    }


	}



})()