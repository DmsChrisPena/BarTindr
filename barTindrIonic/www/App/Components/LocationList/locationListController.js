(function() {
	angular
		.module('BarTindrApp')
		.controller('LocationListController', ['$scope', 'locationListService', '$ionicLoading', 'getLocationService', '$state', '$http', '$ionicPopup', '$window', LocationListController]);
		
	function LocationListController($scope, locationListService, $ionicLoading, getLocationService, $state, $http, $ionicPopup, $window) {
		
		//Function
		$scope.changeLocation = changeLocation;
		$scope.deleteLocation = deleteLocation;
		$scope.doRefresh = doRefresh;
		$scope.shouldShowDelete = false;
		$scope.shouldShowReorder = false;
		$scope.listCanSwipe = true;
		$scope.currentLocations = [];
		$scope.addressLocations = [];

		function doRefresh() {
			// $http({
			// 	url: 'http://localhost:52355/api/user',
			// 	method: 'GET',
			// 	header: { 'Authorization': 'Bearer ' + $window.sessionStorage.getItem('token') }
			// }).success(function(data) {
				
			// }).error(function(data) {
			// 	deferred.reject(data);
			// 	//Error message with redirect
			// 	$ionicPopup.alert({
			// 		title: '<h5>Could not load Locations</h5>',
			// 		template: '<h5 class="text-center">Please Try again...</h5>'
			// 	});
			// 	$state.go('home');
			// }).finally(function(){
			// 	$scope.$broadcast('scroll.refreshComplete');
			// })
			loadLocationList();
		}

		function changeLocation(locationId) {
			$http({
				method: "POST",
				url: "http://localhost:52355/api/Locations/" + locationId
			}).success(function(data){
				console.log(data);
				loadLocationList();
			}).error(function(data){

			});
		}

		function loadLocationList() {
			$ionicLoading.show({
				template: 'Loading your locations...<br /> <ion-spinner icon="ripple" style="stroke: white;"></ion-spinner>',
				duration: 1500
			})
			locationListService.getUserInfo().then(success, fail);

			function success(data) {
				$scope.$broadcast('scroll.refreshComplete');
				$scope.currentLocations = [];
				$scope.addressLocations = [];
				console.log(data);
				for(dat in data[0].locations) {
					var firstLetter = data[0].locations[dat].name[0].toLowerCase();
					if(data[0].locations[dat].isCurrentLocation) {
						firstLetter = data[0].locations[dat].address[0].toLowerCase();
						$scope.currentLocations.push(data[0].locations[dat]);
						if(firstLetter == "0") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/ABD3370968.jpg"
						}
						if(firstLetter == "1") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4RTCOR63JG.jpg"
						}
						if(firstLetter == "2") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/C976A92C98.jpg"
						}
						if(firstLetter == "3") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/7Y6WKYPFOA.jpg"
						}
						if(firstLetter == "4") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4LZRZTD1MC.jpg"
						}
						if(firstLetter == "5") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/00YV2O0TYY.jpg"
						}
						if(firstLetter == "6") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/W1HCZ4TW0B.jpg"
						}
						if(firstLetter == "7") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/SJTHV6RIVB.jpg"
						}
						if(firstLetter == "8") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4178415E1A.jpg"
						}
						if(firstLetter == "9") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/7QCITQYBUD.jpg"
						}
						if(firstLetter == "a") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4SRA1ZTKGU.jpg"
						}
						if(firstLetter == "b") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4ETFT2L7TD.jpg"
						}
						if(firstLetter == "c") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/8TH9XAQ65W.jpg"
						}
						if(firstLetter == "d") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/9AMDEKRXAA.jpg"
						}
						if(firstLetter == "f") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/FADBC51B8C.jpg"
						}
						if(firstLetter == "g") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/9E4JC805GX.jpg"
						}
						if(firstLetter == "h") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/3TREB6ZCA3.jpg"
						}
						if(firstLetter == "i") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/8HLGPQMINL.jpg"
						}
						if(firstLetter == "j") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/E3PVOJJPNW.jpg"
						}
						if(firstLetter == "k") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/E19F7DF02B.jpg"
						}
						if(firstLetter == "l") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/ZWBB4XCZT9.jpg"
						}
						if(firstLetter == "m") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/SXYB4OBXO4.jpg"
						}
						if(firstLetter == "n") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/ZYL4GRHL4F.jpg"
						}
						if(firstLetter == "o") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/5PLVCLTIM9.jpg"
						}
						if(firstLetter == "p") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/EA020BDC54.jpg"
						}
						if(firstLetter == "q") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/Z50HOJW78Q.jpg"
						}
						if(firstLetter == "r") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/E3B73FDACE.jpg"
						}
						if(firstLetter == "s") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/KC0NPNZGKT.jpg"
						}
						if(firstLetter == "t") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/VHMCMLJPRE.jpg"
						}
						if(firstLetter == "u") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/TBD46Y2U57.jpg"
						}
						if(firstLetter == "v") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/EE56WYJWZP.jpg"
						}
						if(firstLetter == "w") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/DCD7DB1A04.jpg"
						}
						if(firstLetter == "x") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/219B6258B6.jpg"
						}
						if(firstLetter == "y") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/6588A091F1.jpg"
						}
						if(firstLetter == "z") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/7E71222234.jpg"
						}
					} else {

						//Address Location
						if(firstLetter == "0") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/ABD3370968.jpg"
						}
						if(firstLetter == "1") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4RTCOR63JG.jpg"
						}
						if(firstLetter == "2") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/C976A92C98.jpg"
						}
						if(firstLetter == "3") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/7Y6WKYPFOA.jpg"
						}
						if(firstLetter == "4") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4LZRZTD1MC.jpg"
						}
						if(firstLetter == "5") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/00YV2O0TYY.jpg"
						}
						if(firstLetter == "6") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/W1HCZ4TW0B.jpg"
						}
						if(firstLetter == "7") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/SJTHV6RIVB.jpg"
						}
						if(firstLetter == "8") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4178415E1A.jpg"
						}
						if(firstLetter == "9") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/7QCITQYBUD.jpg"
						}
						if(firstLetter == "a") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4SRA1ZTKGU.jpg"
						}
						if(firstLetter == "b") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/4ETFT2L7TD.jpg"
						}
						if(firstLetter == "c") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/8TH9XAQ65W.jpg"
						}
						if(firstLetter == "d") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/9AMDEKRXAA.jpg"
						}
						if(firstLetter == "f") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/FADBC51B8C.jpg"
						}
						if(firstLetter == "g") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/9E4JC805GX.jpg"
						}
						if(firstLetter == "h") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/3TREB6ZCA3.jpg"
						}
						if(firstLetter == "i") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/8HLGPQMINL.jpg"
						}
						if(firstLetter == "j") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/E3PVOJJPNW.jpg"
						}
						if(firstLetter == "k") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/E19F7DF02B.jpg"
						}
						if(firstLetter == "l") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/ZWBB4XCZT9.jpg"
						}
						if(firstLetter == "m") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/SXYB4OBXO4.jpg"
						}
						if(firstLetter == "n") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/ZYL4GRHL4F.jpg"
						}
						if(firstLetter == "o") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/5PLVCLTIM9.jpg"
						}
						if(firstLetter == "p") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/EA020BDC54.jpg"
						}
						if(firstLetter == "q") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/Z50HOJW78Q.jpg"
						}
						if(firstLetter == "r") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/E3B73FDACE.jpg"
						}
						if(firstLetter == "s") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/KC0NPNZGKT.jpg"
						}
						if(firstLetter == "t") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/VHMCMLJPRE.jpg"
						}
						if(firstLetter == "u") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/TBD46Y2U57.jpg"
						}
						if(firstLetter == "v") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/EE56WYJWZP.jpg"
						}
						if(firstLetter == "w") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/DCD7DB1A04.jpg"
						}
						if(firstLetter == "x") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/219B6258B6.jpg"
						}
						if(firstLetter == "y") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/6588A091F1.jpg"
						}
						if(firstLetter == "z") {
							 data[0].locations[dat].image = "https://snap-photos.s3.amazonaws.com/img-thumbs/280h/7E71222234.jpg"
						}

						if((data[0].locations.length - $scope.currentLocations.length) < $scope.addressLocations.length) {
							console.log('too big');
						} else {
							$scope.addressLocations.push(data[0].locations[dat]);
						}
					}
				}

				$ionicLoading.hide();
				$scope.locations = data;

			}

			function fail(data) {
				$ionicLoading.hide();
				console.log(data);
			}			
		}

		function deleteLocation(locationId, locationName) {
		var confirmPopup = $ionicPopup.confirm({
		     title: locationName,
		     template: '<p class="text-center">Are you sure you want to delete this location?</p>' 
		   });
		   confirmPopup.then(function(res) {
		     if(res) {
				$http({
					method: "DELETE",
					url: "http://localhost:52355/api/Locations/" + locationId
				}).success(function(data){
					loadLocationList();
					$ionicLoading.hide();
				}).error(function(data){
					$ionicLoading.hide();
					console.log(data);
				}); 
		     } else {

		     }
		   });
		}

		loadLocationList();
		
	}
})();