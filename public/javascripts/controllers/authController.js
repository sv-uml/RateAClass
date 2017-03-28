(function() {
	'use strict';

	var app = angular.module('rc.controllers.auth', ['ui.router']);
	app.config([
		'$stateProvider', 
		function($stateProvider) {
			$stateProvider.state('login', {
				parent: 'root',
				url: '/login', 
				views: {
				   'container@': {
				   	 templateUrl: 'internal/login', 
					 controller: 'AuthCtrl'
				   }
				},
				onEnter: ['$state', 'authService', function($state, authService) {
					if(authService.isLoggedIn() ) {
						$state.go('home');
					}
				}]
			})
			.state('register', {
				parent: 'root',
				url: '/register', 
				views: {
				   'container@': {
				   	 templateUrl: 'internal/register', 
					 controller: 'AuthCtrl'
				   }
				},
				onEnter: ['$state', 'authService', function($state, authService) {
					if(authService.isLoggedIn() ) {
						$state.go('home');
					}
				}]
			});
	}]);
app.controller('AuthCtrl', [
	'$scope', 
	'$rootScope',
	'$state', 
	'authService',
	function($scope, $rootScope, $state, authService) {
		//... logic will be here...
		$scope.user = {};
		$rootScope.appBodyClass = 'login_body';

		$scope.register = function(){
			authService.register($scope.user).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('home');
			});
		};
		$scope.logIn = function(comment) {
			authService.logIn($scope.user).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('home');
			});
		};
	}]);
})();