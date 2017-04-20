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
<<<<<<< HEAD
			})
			.state('review', {
				parent: 'root',
				url: '/review/:unique',
				views: {
				   'container@': {
				   	 templateUrl: 'internal/review', 
					 controller: 'SchoolCtrl'
				   }
				},   
                resolve: {
                    getReviewPromise: ['mainService', '$stateParams', function(mainService, $stateParams) {
                        return mainService.getReviews($stateParams.unique);
                    }]
                }
=======
>>>>>>> 0079426e0b18524e1e769c9bf7bd53691ac9c08d
			});
		}
	]);
	app.controller('SchoolCtrl', [
		'$scope',
		'$rootScope',
		'mainService',
<<<<<<< HEAD
		'$state',
		function($scope, $rootScope, mainService, $state) {
			if ($state.is('review')) {
				$scope.reviews = mainService.reviews;
				$scope.reviewClass = $scope.reviews[0].title;
				$scope.school_str = $scope.reviews[0].school;
				$scope.brand_asset = "/images/schools/" + $scope.school_str + ".png";
				$scope.school_name = $scope.reviews[0].name;
				$scope.school_address = $scope.reviews[0].location;
			}
			else
			{
				$rootScope.appBodyClass = 'school_body';
				$scope.school_str = mainService.school[0].unique_str;
				$scope.brand_asset = "/images/schools/" + $scope.school_str + ".png";
				$scope.school_name = mainService.school[0].name;
				$scope.school_address = mainService.school[0].location;
				$scope.classes = mainService.classes;
			}
=======
		function($scope, $rootScope, mainService) {
			$rootScope.appBodyClass = 'school_body';
			$scope.brand_asset = "/images/schools/" + mainService.school[0].unique_str + ".png";
			$scope.school_name = mainService.school[0].name;
			$scope.school_address = mainService.school[0].location;
			$scope.classes = mainService.classes;
>>>>>>> 0079426e0b18524e1e769c9bf7bd53691ac9c08d
		}
	]);
})();