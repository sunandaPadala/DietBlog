'use strict';
angular.module('dietBlog').controller('categoriesCtrl', ['$scope', 'categoryArticles', 'categoryService', 'angularGridInstance', '$state', function($scope, categoryArticles, categoryService, angularGridInstance, $state) {
  $scope.categoryData = categoryArticles.data;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 4;
  $scope.totalItems = 0;
  $scope.issearch = false;
  $scope.formData = {};
  $scope.noResults = false;
  /*if (gridData) {
    console.log(gridData);
    $scope.currentPage = gridData.currentPage;
    $scope.totalItems = gridData.totalCount;
    $scope.categoryData = gridData.tips;
    if (angularGridInstance.category) {
      angularGridInstance.category.refresh();
    }
    if ($state.params.page !== gridData.currentPage) {
      $state.go('main.blog', { page: gridData.currentPage });
    }
  }*/
  $scope.paginate = function(limit, skip) {
    blogService.getBlogs(limit, skip).then(function(response) {
      $scope.totalItems = response.totalCount;
      $scope.categoryData = response.tips;
      if (angularGridInstance.category) {
        angularGridInstance.category.refresh();
      }
    }, function(error) {
      console.log(error);
    });
  };
  //$scope.paginate($scope.itemsPerPage, 0);
  $scope.loadBlogDetails = function(pic) {
    $state.go('main.blogDetails', { id: pic.id });
  };
  $scope.pageChangeHandler = function(nmbr) {
    $scope.currentPage = nmbr;
    $state.go('main.blog', { page: nmbr });
    $scope.paginate($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.currentPage - 1)));
    $("html, body").animate({ scrollTop: $('#gridcontainer').offset().top - 50 }, 500);
  };

  $scope.getIdForShare = function(getId) {
    $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
  };
  $scope.search = function() {
    var searchText = $scope.formData.searchString;
    categoryService.categoryArticlesSearch(searchText).then(function(response) {
      $scope.categoryData = response;
      $scope.totalItems = $scope.categoryData.length;
      if (angularGridInstance.category) {
        angularGridInstance.category.refresh();
      }

      if ($scope.categoryData.length <= 0) {
        $scope.noResults = true;
      } else {
        angularGridInstance.category.refresh();
      }
    }, function(error) {
      console.log(error);
    });


    $scope.issearch = true;
  };
  $scope.cancel = function() {
    $scope.formData.searchString = '';
    $scope.issearch = false;
    $scope.noResults = false;
    $scope.paginate($scope.itemsPerPage, 0);
  };

}]);
