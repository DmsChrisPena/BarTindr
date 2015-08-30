(function() {
	angular
		.module('BarTindrApp')
		.controller('IntroController', ['$scope', '$state', '$location', '$ionicSlideBoxDelegate', IntroController]);

	function IntroController($scope, $state, $location, $ionicSlideBoxDelegate) {
		$scope.startApp = startApp;
		$scope.nextIntro = nextIntro;
		$scope.previousIntro = previousIntro;
		$scope.slideChanged = slideChanged;

		function startApp() {
			$location.path('/');
		} 

		function nextIntro() {
			$ionicSlideBoxDelegate.next();
		}

		function previousIntro() {
			$ionicSlideBoxDelegate.previous();
		}

		function slideChanged(index) {
			$scope.slideIndex = index;
		}
	}
})();