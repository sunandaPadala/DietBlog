'use strict';
angular.module('dietBlog').controller('categoriesCtrl', ['$scope', 'categoryArticles', 'categoryService', 'angularGridInstance', '$state', 'configSettings', function($scope, categoryArticles, categoryService, angularGridInstance, $state, configSettings) {
  $scope.categoryData = categoryArticles.data.tips;
  // $scope.currentPage = 1;
  $scope.pagination = {
    currentPage: $state.params.page
  };
  $scope.itemsPerPage = configSettings.itemsPerPage;
  $scope.formData = {};
  if ($state.params.searchstr.trim() !== '') {
    $scope.issearch = true;
    $scope.formData.searchString = $state.params.searchstr;
  } else {
    $scope.issearch = false;
  }
  $scope.noResults = false;
  $scope.totalItems = categoryArticles.data.totalCount;
  if ($scope.totalItems == 0) {
    $scope.noResults = true;
  }
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
      $state.go('main.categories', { searchstr: $scope.formData.searchString, page: nmbr });

      $scope.search($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)));
    } else {
      $state.go('main.categories', { page: nmbr, searchstr: $scope.formData.searchString });

      $scope.paginate(categoryId, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)), $scope.itemsPerPage);
    }

  };

  $scope.getIdForShare = function(getId) {
    $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
  };
  $scope.search = function(limit, skip, fromUser) {
    $scope.noResults = false;
    var searchText = $scope.formData.searchString;
    var pageLimit = (limit && limit >= 0) ? limit : configSettings.itemsPerPage;
    var pageSkip = (skip && skip >= 0) ? skip : 0;
    $scope.issearch = true;

    if (fromUser) {
      if ($scope.pagination.currentPage == 1) {
        $state.go('main.categories', { searchstr: $scope.formData.searchString, page: 1 });
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

      } else {
        $scope.pagination.currentPage = 1;
      }
    } else {
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
    if ($scope.pagination.currentPage == 1) {
      // $scope.paginate($scope.itemsPerPage, 0);
      $state.go('main.categories', { searchstr: $scope.formData.searchString, page: 1 });
      $scope.paginate(categoryId, 0, $scope.itemsPerPage);

    } else {
      $scope.pagination.currentPage = 1;
    }
  };

}]);
