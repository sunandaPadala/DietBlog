'use strict';
angular.module('dietBlog')
  .controller('blogDetailsCtrl', function($scope, myService, blogService) {

    $scope.blogPageDetails = myService.getter();
    //console.log($scope.blogPageDetails);
    //$( ".blog-captions" ).html($scope.blogPageDetails.description);
    //$($scope.blogPageDetails.description).appendTo($(".blog-captions"));
    $scope.blogPostId = $scope.blogPageDetails.id;

    blogService.getSpecificData($scope.blogPostId).then(function(response) {
      console.log(response);
      $scope.blogPostResponse = response;
    }, function(error) {
      console.log(error);
    });
  });
