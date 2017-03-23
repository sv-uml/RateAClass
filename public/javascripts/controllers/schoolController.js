(function() {
	'use strict';

	var app = angular.module('rc.controllers.school', ['ui.router']);
	app.config([
		'$stateProvider', 
		function($stateProvider) {
			$stateProvider.state('school', {
				parent: 'root',
				url: '/school/:unique',
				views: {
				   'container@': {
				   	 templateUrl: 'internal/school', 
					 controller: 'SchoolCtrl'
				   }
				}
			});
	}]);
app.controller('SchoolCtrl', [
	'$scope', 
	'$state', 
	'$stateParams',
	function($scope,  $state, $stateParams) {
		console.log($stateParams);
	}]);
})();