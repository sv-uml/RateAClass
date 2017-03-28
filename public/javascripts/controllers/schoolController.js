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
				},   
                resolve: {
                    getSchoolPromise: ['mainService', '$stateParams', function(mainService, $stateParams) {
                        return mainService.getSchool($stateParams.unique);
                    }],
                    getClassPromise: ['mainService', '$stateParams', function(mainService, $stateParams) {
                        return mainService.getClasses($stateParams.unique, "all");
                    }]
                }
			});
		}
	]);
	app.controller('SchoolCtrl', [
		'$scope',
		'$rootScope',
		'mainService',
		function($scope, $rootScope, mainService) {
			$rootScope.appBodyClass = 'school_body';
			$scope.brand_asset = "/images/schools/" + mainService.school.unique + ".png";
			$scope.school_name = mainService.school.name;
			$scope.school_address = mainService.school.location;
			$scope.classes = mainService.classes;
		}
	]);
})();