(function() {
	"use strict";
    var app = angular.module('rc.services.auth', []);

    // authentification...save cookie into local storage
	app.factory('authService', ['$http', '$window', function($http, $window) {
		var auth = {};
		auth.saveToken = function(token) { $window.localStorage['rc-token'] = token; };
		auth.getToken = function() { return $window.localStorage['rc-token']; };
		auth.isLoggedIn = function() {
			var token = auth.getToken();
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		auth.currentUser = function() {
			if (auth.isLoggedIn()){
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.name;
			}
		};

		auth.currentUserId = function() {
			if (auth.isLoggedIn()){
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload._id;
			}
		};
		
		auth.register = function(user) {
			return $http.post('/api/auth/register', user).success(function(data) { auth.saveToken(data.token); });
		};

		auth.logIn = function(user) {
			return $http.post('/api/auth/login', user).success(function(data) { auth.saveToken(data.token); });
		};

		auth.logOut = function() { $window.localStorage.removeItem('rc-token'); };

		return auth;
	}]);
})();
