(function() {
	'use strict';

	var app = angular.module('rc.controllers.main', ['ui.router', 'angularMoment']);
	
	app.config([
	'$stateProvider', 
	function($stateProvider) {

		$stateProvider.state('home', {
			parent: "root",
			url: '/home', 
			views: {
				"container@": {
					templateUrl: 'internal/home', 
					controller: 'MainCtrl',
				}
			},	 
			resolve: {
				getPostPromise: ['postService', function(postService) {
					//return postService.getExcel();
				}]
			}
		});
	}]);
	app.controller('MainCtrl', [
	'$scope', 
	'postService',
	'authService',
	'$log',
	function($scope, postService, authService, $log) {
		
		$scope.posts = postService.posts;
		$scope.isLoggedIn = authService.isLoggedIn;
		$scope.isVoted = authService.isVoted;
		$scope.setVote = authService.setVote;
		$scope.posts_limit = 40;
		$scope.executingOption = false;
		$scope.currentIndex = 0;
		$scope.postSaved = "";

		$scope.updatePostSave = function (post, item) {
			var status = (item == "going") ? "Going" : "Not Going";
			post.status = status;
			$scope.postSaved = "Saved (" + status + ")";
			postService.updateRow(post);
			item = "";
		}

		$scope.setCurrentSlideIndex = function (index) {
			$scope.currentIndex = index;
		};

		$scope.isCurrentSlideIndex = function (index) {
			return $scope.currentIndex === index;
		};

	    $scope.prevSlide = function () {
	        $scope.currentIndex = ($scope.currentIndex < $scope.posts.length - 1) ? ++$scope.currentIndex : 0;
	    };

	    $scope.nextSlide = function () {
	        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.posts.length - 1;
	        $scope.postSaved = "";
	    };

		$scope.loadMore = function() {
			$scope.posts_limit += $scope.posts_limit;
		}

		$scope.getSQLStatements = function() {
			$scope.executingOption = true;
			postService.downloadAll();
			$scope.executingOption = false;
		}

		$scope.addPost = function() {
			if (!$scope.mysql || $scope.mysql === '') { return; }
			if (!$scope.mssql || $scope.mssql === '') { return; }
			
			postService.create({
				mysql: $scope.mysql, 
				mssql: $scope.mssql, 
				comments: $scope.comments
			});

			$scope.posts.push({
				user: authService.currentUser(),
				mysql: $scope.mysql, 
				mssql: $scope.mssql, 
				comments: $scope.comments,
				datetime: Math.floor(Date.now() / 1000)
			})
			
			$scope.mysql = '';
			$scope.mssql = '';
			$scope.comments = '';
		};
		$scope.deletePost = function(post) {
				postService.delete(post);
		}
		$scope.incrementUpvotes = function(post, authService, log) {
			
			if ($scope.isVoted()) { 
				$log.info('"Only one vote is allowed!');
			// display error message
				var error = {
        			message: "Only one vote is allowed",
   	    			error: {}
   	    		};
				$scope.error = error;
			} else  { 
				postService.upvote(post); 
				$scope.setVote();
			} 
		};
		$scope.decrementUpvotes = function(post, authService, log) {
			
			if ($scope.isVoted()) { 
				$log.info('MyCtrl has been invoked!');
			// display error message
				var error = {
        			message: "Only one vote is allowed",
   	    			error: {}
   	    		};
				$scope.error = error;
			} else  { 
				postService.downvote(post); 
				$scope.setVote();
			} 
		};
	}])
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });

})();