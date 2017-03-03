(function() {
	"use strict";
    var app = angular.module('rc.services.post', []);

    app.factory('postService', ['$http', 'authService', 
    	function($http, authService) {

		var o = {
			posts: []
		};
		// display all posts by default home access...
		o.getAll = function() {/*
			return $http.get('/posts', {
				headers: {Authorization: 'Bearer ' + authService.getToken()}
			}).success(function(data){
	   			angular.copy(data, o.posts);
			});*/
		};

		o.getExcel = function() {
			return $http.get('/sheet').success(function(data){
	   			angular.copy(data, o.posts);
			});
		};

		o.updateRow = function(post) {
			return $http.put('/sheet/update', post).success(function(data) {
				post.status = "";
			});
		}

		// add new post...
		o.create = function(post) {

			return $http.post('/posts', post, {
				headers: {Authorization: 'Bearer ' + authService.getToken()}
			}).success(function(data) {
				o.posts.push(data);
			});
		};
		// update post...
		o.save = function(post) {
			return $http.post('/posts/' + post._id, post, {
				headers: {Authorization: 'Bearer ' + authService.getToken()}
			}).success(function(data) {
				 // TODO - what is the best practice after saving??
			});
		};
		// delete single post
		o.delete = function(post) {
			return $http.delete('/posts/' + post._id).success(function(data) {
				angular.copy(data, o.posts);
			});
		}
		// increate upvote on post
		o.upvote = function(post) {
			return $http.put('/posts/' + post._id + '/upvote', null, {
				headers: {Authorization: 'Bearer '+ authService.getToken()}
			}).success(function(data) {
				post.upvotes += 1;
			});
		};
		// decrease upvote on post
		o.downvote = function(post) {
			return $http.put('/posts/' + post._id + '/downvote', null, {
				headers: {Authorization: 'Bearer '+ authService.getToken()}
			}).success(function(data) {
				post.upvotes -= 1;
			});
		};
		// find post by id
		o.get = function(id) {
			return $http.get('/posts/' + id).then(function(res) {
				return res.data;
			});
		};
		// add comment
		o.addComment = function(id, comment) {
			return $http.post('/posts/' + id + '/comments', comment, {
				headers: {Authorization: 'Bearer '+ authService.getToken()}
			});
		};
		// delete single comment
		o.deleteComment = function(post, comment) {
			return $http.delete("/posts/" + post._id + "/comments/" + comment._id, {
				headers: {
					Authorization: "Bearer " + authService.getToken()
				}
			});
		}
		// increase comment upvoite...
		o.upvoteComment = function(post, comment) {
			return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
				headers: {Authorization: 'Bearer '+ authService.getToken()}
			}).success(function(data) {
				comment.upvotes += 1;
			});
		};
		// increase comment upvoite...
		o.downvoteComment = function(post, comment) {
			return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/downvote', null, {
				headers: {Authorization: 'Bearer '+ authService.getToken()}
			}).success(function(data) {
				comment.upvotes -= 1;
			});
		};

		o.downloadAll = function() {
			return $http.get('/posts/all', {
				headers: {Authorization: 'Bearer ' + authService.getToken()}
			}).success(function(data) {
				 // TODO - what is the best practice after saving??
			});
		};
		return o;
	}]);
})();
