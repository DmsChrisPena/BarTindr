(function() {
	angular
		.module('BarTindrApp')
		.controller('HomeController', ['$scope', 'loginService', '$location', 'homeService', '$timeout', '$state', '$ionicActionSheet', '$ionicModal', HomeController]);

	function HomeController($scope, loginService, $location, homeService, $timeout, $state, $ionicActionSheet, $ionicModal) {

		//Functions
		$scope.logoutUser = logoutUser;
		$scope.footerExpand = footerExpand;
		$scope.footerCollapse = footerCollapse;
		$scope.showlocationOptions = showlocationOptions;
		$scope.openModal = openModal;
		$scope.closeModal = closeModal;

		$ionicModal.fromTemplateUrl('App/Components/Home/homeModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		function openModal() {
			$scope.modal.show();
		};

		function closeModal() {
			$scope.modal.hide();
		};

		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});

		$scope.$on('modal.hidden', function() {

		});

		$scope.$on('modal.removed', function() {

		});

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
		       { text: 'Set Location' }
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