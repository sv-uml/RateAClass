(function() {
  "use strict";
var app = angular.module('rc', [
	'rc.controllers.post', 
	'rc.controllers.auth', 
	'rc.controllers.school',
	'rc.controllers.nav', 
	'rc.controllers.main',
	'rc.services.main',
	'rc.services.post', 
	'rc.services.auth',
	'ui.router']);

app.config([
	'$stateProvider', 
	'$urlRouterProvider',
	'$locationProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$stateProvider.state('root', {
			abstract: true, 
			views: {
				'header': {
					templateUrl: 'internal/header',
					controller: 'NavCtrl'
				}
			}
		});
		
		$urlRouterProvider.otherwise('home');
	}]);
})();