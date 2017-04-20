(function() {
	"use strict";
    var app = angular.module('rc.services.main', []);

    // authentification...save cookie into local storage
	app.factory('mainService', ['$http', '$window', function($http, $window) {
		var main = {
		    data: [],
		    schools: [],
		    school: [],
		    classes: [],
			classItem: {},
			reviews: []
		};
		// save token
		main.getSchools = function(name) {
			return $http.get('/api/search/school/' + name).success(function(data) {
	   			angular.copy(data, main.schools);
			});
		};

		main.getClasses = function(s, c) {
			return $http.get('/api/search/' + s + '/' + c).success(function(data) {
	   			angular.copy(data, main.classes);
			});
		};

		main.getSchool = function(unique) {
			return $http.get('/api/school/' + unique).success(function(data) {
				angular.copy(data, main.school);
			});
		}

		main.getReviews = function(unique) {
			return $http.get('/api/reviews/' + unique).success(function(data) {
				angular.copy(data, main.reviews);
			});
		}

		main.getClass = function(unique) {
			return $http.get('/api/class/' + unique).success(function(data) {
				main.classItem = data;
			});
		}

		main.postReview = function(obj, token) {
			return $http.post('/api/review/post', obj, {
				headers: {
					Authorization: "Bearer " + token
				}
			}).success(function(data) {
				main.classItem = data;
			});
		}
		return main;
	}]);
})();