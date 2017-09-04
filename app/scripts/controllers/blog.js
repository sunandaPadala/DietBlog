'use strict';
angular.module('dietBlog')
  .controller('MainCtrl', function($scope, $state, blogService, angularGridInstance, myService) {
    $scope.awesomeThings = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 4;
    $scope.totalItems = 0;
    $scope.paginate = function(limit, skip) {
      blogService.getBlogs(limit, skip).then(function(response) {
        console.log(response)
        $scope.totalItems = response.totalCount;
        $scope.awesomeThings = response.tips;
        angularGridInstance.gallery.refresh();
      }, function(error) {
        console.log(error);
      });
    };
    $scope.paginate($scope.itemsPerPage, 0);
    $scope.loadBlogDetails = function(pic) {
      console.log(pic);
      myService.setter(pic);
      $state.go('main.blogDetails');
      $("html, body").animate({ scrollTop: $('#main-content').offset().top }, 0);
    };
    $scope.pageChangeHandler = function(nmbr) {
      $scope.currentPage = nmbr;
      $scope.paginate($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.currentPage - 1)));
    };
  });
