'use strict';
angular.module('dietBlog')
  .controller('MainCtrl', function($scope, $state, blogService, angularGridInstance) {
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
      $state.go('main.blogDetails');
    }
    $scope.pageChangeHandler = function(nmbr) {
      $scope.currentPage = nmbr;
      $scope.paginate($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.currentPage - 1)));
    };
  });
