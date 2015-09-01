(function(){
	angular
		.module('BarTindrApp')
		.controller('ShopController', ['$http', '$scope', '$q', '$ionicLoading', '$ionicActionSheet', ShopController]);

	function ShopController($http, $scope, $q, $ionicLoading, $ionicActionSheet) {
		$scope.everythingWeNeed = [];
		$scope.getPlaces = getPlaces;
		$scope.likePlace = likePlace;
		$scope.getSpots = getSpots;
		$scope.routeMe = routeMe;


		function getPlaces(lat, lng, radius, section) {
			var promises = [];
			
			var clientInfo = {
				clientId: 'QVSPFCY2CMP0LWO1NDRQIBN523IOX22IYTQGG02RSIJTJTOE',
				clientSecret: '3MKDIXJAHAVOPV2YLIROCEQG1WXBWUXVYUIFCOGSOISHA1GD',
				version: '20150822'
			}

			$ionicLoading.show({
				template: 'Get in the car loser we\'re going shopping...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>'
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
				console.log(data);
				$scope.getSpots();
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
				$scope.getSpots();
				console.log(data);
			});
		}

		$http({
			method: 'GET',
			url: "http://localhost:52355/api/places"
		}).success(function(data){
			console.log(data);
			getPlaces(data.locations[0].latitude, data.locations[0].longitude, data.locations[0].radius, 'shops');
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
    	likePlace(card, false, true, 'shop');
    }

    $scope.cardSwipedRight = function(card) {
    	console.log('swipe right', card);
    	likePlace(card, true, false, 'shop');
    }	

		 function routeMe(lat, lng, fullAdd) {
		 		console.log(lat, lng, fullAdd);
				// Show the action sheet
			   var hideSheet = $ionicActionSheet.show({
			     buttons: [
			       { text: 'Route Me' },
			       { text: 'Uber Me' }
			     ],
			     titleText: 'Route',
			     cancelText: 'Cancel',
			     cancel: function() {
			          // add cancel code..
			        },
			     buttonClicked: function(index) {
			     	if(index === 1) {
			     		window.location = "http://maps.apple.com/?daddr=" + fullAdd;
			     		window.location = "comgooglemaps://?saddr=" + fullAdd
			       		return true;
			     	}
			     	if(index === 0) {
			     		window.location = "https://m.uber.com/sign-up?client_id=b32fu5Np2wwoGBN5goMySgxP6A36BOCw&dropoff_latitude=" + lat + "&dropoff_longitude=" + lng + "&dropoff_nickname=" + fullAdd + "&dropoff_address=" + fullAdd
			     		return true;
			     	}
			       return true;

			     }
			   });    	
		    }

	}



})()