(function() {
	'use strict';

	var app = angular.module('rc.controllers.nav', ['ui.router']);
		
	app.controller('NavCtrl', [
		'$scope',
		'authService',
		'$state',
		function($scope, authService, $state){
			$scope.isLoggedIn = authService.isLoggedIn;
			$scope.currentUser = authService.currentUser;
			$scope.logOut = authService.logOut;
			$scope.rootPage = $state.is('home');
		}]
	);
})();