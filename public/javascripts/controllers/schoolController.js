(function() {
	'use strict';

	var app = angular.module('rc.controllers.school', ['ui.router', 'angularMoment', 'angular-rating']);
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
			})
			.state('addreview', {
				parent: 'root',
				url: '/review/:id/add',
				views: {
				   'container@': {
				   	 templateUrl: 'internal/addreview', 
					 controller: 'SchoolCtrl'
				   }
				},
                resolve: {
                    getReviewPromise: ['mainService', '$stateParams', function(mainService, $stateParams) {
                        return mainService.getClass($stateParams.id);
                    }]
                },
				onEnter: ['$state', 'authService', function($state, authService) {
					if(!authService.isLoggedIn() ) {
						$window.location.href = "/login";
					}
				}]
			});
		}
	]);
	app.controller('SchoolCtrl', [
		'$scope',
		'$rootScope',
		'mainService',
		'authService',
		'$state',
		'$stateParams',
		'$window',
		function($scope, $rootScope, mainService, authService, $state, $stateParams, $window) {
			$scope.review = {};
			$scope.rating_num = 0;
			$scope.isLoggedIn = authService.isLoggedIn();
			$rootScope.appBodyClass = 'review_body';
			if ($state.is('review')) {
				$scope.class_id = $stateParams.unique;
				$scope.reviews = mainService.reviews;
				$scope.reviewClass = $scope.reviews[0].title;
				$scope.school_str = $scope.reviews[0].school;
				$scope.brand_asset = "/images/schools/" + $scope.school_str + ".png";
				$scope.school_name = $scope.reviews[0].name;
				$scope.school_address = $scope.reviews[0].location;
				$scope.user_id = authService.currentUserId();
				$scope.avg_rating = $scope.reviews[0].rating;
				$scope.rating_num = $scope.avg_rating;
			}
			else if ($state.is('addreview')) {
				$scope.school_str = $stateParams.unique;
				$scope.class_id = $stateParams.class;
				$scope.class_obj = mainService.classItem;
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
			$scope.submitAddReview = function() {
				$scope.review.rating = $scope.rating_num;
				$scope.review.user = authService.currentUserId();
				$scope.review.class_id = $scope.class_obj.id;
				$scope.review.school = $scope.class_obj.school;
				mainService.postReview($scope.review, authService.getToken()).error(function(error){
					$scope.error = error;
				}).then(function(){
					$window.location.href = "/review/" + $scope.class_obj.id;
				});
			}
		}
	]);
})();