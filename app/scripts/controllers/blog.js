'use strict';
angular.module('dietBlog')
  .controller('MainCtrl', function($scope, $state, blogService) {
    $scope.awesomeThings = blogService.loadImages();
    $scope.loadBlogDetails = function(pic) {
      console.log(pic);
      $state.go('main.blogDetails');
    }

  });
