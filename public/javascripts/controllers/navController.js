(function () {
	'use strict';

	var app = angular.module('rc.controllers.nav', ['ui.router']);

	app.controller('NavCtrl', [
		'$scope',
		'authService',
		'mainService',
		'$compile',
		'$state',
		function ($scope, authService, mainService, $compile, $state) {
			$scope.isLoggedIn = authService.isLoggedIn;
			$scope.currentUser = authService.currentUser;
			console.log(authService.currentUserId());
			$scope.logOut = authService.logOut;
			$scope.rootPage = $state.is('home');
			$scope.current_search = false;

			$scope.search = function () {
				if ($scope.searchschool_global.length == 0) {
					$("input.search-global").removeClass("focus");
					$("a.section").show();
					$scope.current_search = false;
					$("div.container.search").remove();
					$("div.container#container").show();
					$("input.search-global").focus();
				} else {
					if (!$scope.current_search) {
						$("input.search-global").addClass("focus");
						var gc = angular.element(document.querySelector('.global-container'));
						angular.element(document).find(".global-container").prepend(angular.element('<div class="container search"></div>'));
						$("div.container#container").hide();

						$scope.current_search = true;
					}
					$("a.section").hide();

					$("div.container.search").html("");
					mainService.getSchools($scope.searchschool_global);
					mainService.schools.forEach(function (item) {
						angular.element(document).find("div.container.search").append($compile('<a class="school-result" href="/school/' + item.unique_str + '" target="_self"><div class="info-section"><h2>' + item.name + '</h2><span>' + item.location + '</span></div><div class="link-section"><i class="fa fa-chevron-right"></i></div></a>')($scope));
					});
				}
			}
		}]
	);
})();