(function() {
  "use strict";
var app = angular.module('rc', [
	'rc.controllers.post', 
	'rc.controllers.auth', 
	'rc.controllers.nav', 
	'rc.controllers.main', 
	'rc.services.post', 
	'rc.services.auth', 
	'ui.router']);

app.config([
	'$stateProvider', 
	'$urlRouterProvider', 
	function($stateProvider, $urlRouterProvider) {
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