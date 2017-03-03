(function() {
	'use strict';

	var app = angular.module('rc.controllers.post', ['ui.router']);
		app.config([
	'$stateProvider', 
	function($stateProvider) {

		$stateProvider.state('post', {
			parent: "root",
			url: '/posts/{id}', 
			views: {
				"container@": {
					templateUrl: 'internal/post', 
					controller: 'PostsCtrl',
				}
			},	 
			resolve: {
				post: ['$stateParams', 'postService', function($stateParams, postService) {
					return postService.get($stateParams.id);
				}]
			}
		});
	}]);
		
	app.controller('PostsCtrl', [
	'$scope', 
	'postService', 
	'post',
	'authService',
	function($scope,  postService, post, authService) {
		//... logic will be here...
		$scope.post = post;
		$scope.isLoggedIn = authService.isLoggedIn;

		$scope.addComment = function(){
			if ($scope.body === '') { return; }
			postService.addComment(post._id, {
				body: $scope.body, 
				author:  'user',
			}).success(function(comment) {
				$scope.post.comments.push(comment);
			});
			
			$scope.booy = '';
		};
		$scope.deleteComment = function(comment) {
			postService.deleteComment(post, comment).success(function() {
				post.comments.splice(post.comments.indexOf(comment), 1);
			});
		};
		$scope.incrementUpvotes = function(comment) {
			postService.upvoteComment(post, comment);
		};
		$scope.downVote = function(comment) {
			postService.downvoteComment(post, comment);
		};
		$scope.editorEnabled = false;

	  $scope.enableEditor = function() {
	    $scope.editorEnabled = true;
	    $scope.link = $scope.post.link;
	  };

	  $scope.disableEditor = function() {
	    $scope.editorEnabled = false;
	  };

	  $scope.save = function() {
	    $scope.post.link = $scope.link;
	    
	    // save into db
	   
	    postService.save($scope.post);
	    $scope.disableEditor();
	  };
	}]);
})();