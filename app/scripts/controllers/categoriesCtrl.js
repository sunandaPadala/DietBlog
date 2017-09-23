'use strict';
angular.module('dietBlog').controller('categoriesCtrl', ['$scope', 'categoryArticles', 'categoryService', 'angularGridInstance', '$state', 'configSettings', function($scope, categoryArticles, categoryService, angularGridInstance, $state, configSettings) {
  $scope.categoryData = categoryArticles.data.tips;
  // $scope.currentPage = 1;
  $scope.pagination = {
      currentPage:  1
    };
  $scope.itemsPerPage = configSettings.itemsPerPage;
  $scope.issearch = false;
  $scope.formData = {};
  $scope.noResults = false;
  $scope.totalItems = categoryArticles.data.totalCount;
  var categoryId = categoryArticles.categoryId;
  $scope.paginate = function(categoryId, skip, limit) {
    categoryService.getArticlesByCategory(categoryId, skip, limit).then(function(response) {
      $scope.totalItems = response.data.totalCount;
      $scope.categoryData = response.data.tips;
      if (angularGridInstance.category) {
        angularGridInstance.category.refresh();
      }
    }, function(error) {
      console.log(error);
    });
  };
  $scope.loadBlogDetails = function(pic) {
    $state.go('main.blogDetails', { id: pic.id });
  };
  $scope.pageChangeHandler = function(nmbr) {
    // $scope.currentPage = nmbr;
    if ($scope.issearch) {
      $scope.search($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)));
    } else {
      $scope.paginate(categoryId, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)), $scope.itemsPerPage);
    }

  };

  $scope.getIdForShare = function(getId) {
    $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
  };
  $scope.search = function(limit, skip,fromUser) {
    var searchText = $scope.formData.searchString;
    var pageLimit = limit >= 0 ? limit : configSettings.itemsPerPage;
    var pageSkip = skip >= 0 ? skip : 0;
    // if (pageSkip == 0) {
    //   $scope.pagination.currentPage = 1;
    // }
    $scope.issearch = true;

    if(fromUser){
      if($scope.pagination.currentPage==1){
           categoryService.categoryArticlesSearch(categoryId, searchText, pageSkip, pageLimit).then(function(response) {
            $scope.categoryData = response.data.tips;
            $scope.totalItems = response.data.totalCount;
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

      }else{
          $scope.pagination.currentPage=1;
      }
    }else{
        categoryService.categoryArticlesSearch(categoryId, searchText, pageSkip, pageLimit).then(function(response) {
            $scope.categoryData = response.data.tips;
            $scope.totalItems = response.data.totalCount;
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
    }
   

  };
  $scope.cancel = function() {
    $scope.formData.searchString = '';
    $scope.issearch = false;
    $scope.noResults = false;
    if($scope.pagination.currentPage==1){
       // $scope.paginate($scope.itemsPerPage, 0);
    $scope.paginate(categoryId, 0, $scope.itemsPerPage);

      }else{
      $scope.pagination.currentPage=1;
      }
  };

}]);
