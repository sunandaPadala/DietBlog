'use strict';
angular.module('dietBlog')
  .controller('mainviewCtrl', ['$scope', 'mainviewData', '$window', function($scope, mainviewData, $window) {
    console.log("main sfsd");
    $scope.mainviewData = mainviewData;
    $scope.toggleMenu = function() {
      console.log(mainviewData);
      $scope.mainviewData.menuOpen = !$scope.mainviewData.menuOpen;
    };
    angular.element($window).bind("scroll", function() {
      console.log($scope);
      console.log(this.pageYOffset);
      console.log(this.innerWidth);
      console.log("on scroll");
      if (this.pageYOffset > 250) {
        if (!$scope.mainviewData.scrollview) {
          $scope.mainviewData.scrollview = true;
          if(this.innerWidth>767){
          	$scope.mainviewData.headerview=true;
          }
          $scope.$apply();
        }
      } else {
        if ($scope.mainviewData.scrollview) {
          $scope.mainviewData.scrollview = false;
          if(this.innerWidth>767){
          	$scope.mainviewData.headerview=false;
          }
          $scope.$apply();
        }
      }


    });
    $scope.scrolltoTop = function() {
      console.log("top");
      $('body,html').animate({
        scrollTop: 0,
      }, 700);
    };
  }]);
