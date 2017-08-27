'use strict';
angular.module('dietBlog')
  .controller('MainCtrl', function($scope, $state, blogService) {
    $scope.awesomeThings = blogService.loadImages();
    $scope.loadBlogDetails = function() {
      $state.go('main.about');
    }

  });
