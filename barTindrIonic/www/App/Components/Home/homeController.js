(function() {
	angular
		.module('BarTindrApp')
		.controller('HomeController', ['$scope', 'loginService', '$location', 'homeService', '$timeout', '$state', '$ionicActionSheet', HomeController]);

	function HomeController($scope, loginService, $location, homeService, $timeout, $state, $ionicActionSheet) {

		//Functions
		$scope.logoutUser = logoutUser;
		$scope.footerExpand = footerExpand;
		$scope.footerCollapse = footerCollapse;
		$scope.showlocationOptions = showlocationOptions;

		function logoutUser() {
			loginService.logout();
			$state.go('login');
		}

		function footerExpand() {
			console.log("Footer Expanded");
		}

		function footerCollapse() {
			console.log("Footer Collapsed");
		}


		 // Triggered on a button click, or some other target
		 function showlocationOptions() {

		   // Show the action sheet
		   var hideSheet = $ionicActionSheet.show({
		     buttons: [
		       { text: 'Current Location' },
		       { text: 'Address Location' }
		     ],
		     titleText: 'Create Location',
		     cancelText: 'Cancel',
		     cancel: function() {
		          // add cancel code..
		        },
		     buttonClicked: function(index) {
		     	if(index === 1) {
		     		$state.go('locationAddress');
		       		return true;
		     	}
		     	if(index === 0) {
		     		$state.go('location');
		     		return true;
		     	}
		       return true;

		     }
		   });
		}

	}

})();