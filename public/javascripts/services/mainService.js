(function() {
	"use strict";
    var app = angular.module('rc.services.main', []);

    // authentification...save cookie into local storage
	app.factory('mainService', ['$http', '$window', function($http, $window) {
		var main = {
		    data: [],
		    schools: [],
		    school: {},
		    classes: []
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
			})
		}
		return main;
	}]);
})();