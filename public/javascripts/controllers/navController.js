(function() {
	'use strict';

	var app = angular.module('rc.controllers.nav', ['ui.router']);
		
	app.controller('NavCtrl', [
		'$scope',
		'authService', 
		function($scope, authService){
			$scope.isLoggedIn = authService.isLoggedIn;
			$scope.currentUser = authService.currentUser;
			$scope.logOut = authService.logOut;
		}]
	);
})();