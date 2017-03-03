(function() {
	"use strict";
    var app = angular.module('rc.services.auth', []);

    // authentification...save cookie into local storage
	app.factory('authService', ['$http', '$window', function($http, $window) {
		var auth = {};
		// save token
		auth.saveToken = function(token) {
			$window.localStorage['rc-news-token'] = token;
			$window.localStorage.setItem('rc-news-isVoted', '');
		};
		auth.isVoted = function() {
			if ( $window.localStorage['rc-news-isVoted'] === 'yes') {
				return true;
			} else {
				return false;
			};
		};
		auth.setVote =  function() {
			 $window.localStorage.setItem('rc-news-isVoted', 'yes');
		};
		// get token
		auth.getToken = function() {
			return $window.localStorage['rc-news-token'];
		};
		// eheck login
		auth.isLoggedIn = function() {
			var token = auth.getToken();
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};
		
		// get current username
		auth.currentUser = function() {
			if (auth.isLoggedIn()){
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.username;
			}
		};

		auth.currentUserId = function() {
			if (auth.isLoggedIn()){
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload._id;
			}
		};

		// register user
		auth.register = function(user) {
			return $http.post('/register', user).success(function(data) {
				auth.saveToken(data.token);
			});
		};
		// login user
		auth.logIn = function(user) {
			return $http.post('/api/auth/login', user).success(function(data) {
				auth.saveToken(data.token);
			});
		};
		// logout user
		auth.logOut = function() {
			$window.localStorage.removeItem('rc-news-token');
			
		};

		return auth;
	}]);
})();
