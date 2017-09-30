'use strict';
angular.module('dietBlog').controller('tagArticlesCtrl', ['$scope', 'tagArticles', 'tagsService', 'angularGridInstance', '$state', 'configSettings', function($scope, tagArticles, tagsService, angularGridInstance, $state, configSettings) {
  $scope.tagArticlesData = tagArticles.data.tips;
  $scope.pagination = {
    currentPage: $state.params.page
  };
  $scope.itemsPerPage = configSettings.itemsPerPage;
  $scope.formData = {};
  // $scope.issearch = false;
  if ($state.params.searchstr.trim() !== '') {
    $scope.issearch = true;
    $scope.formData.searchString = $state.params.searchstr;
  } else {
    $scope.issearch = false;
  }
  $scope.noResults = false;
  $scope.totalItems = tagArticles.data.totalCount;
  if ($scope.totalItems == 0) {
    $scope.noResults = true;
  }
  $scope.tagName = tagArticles.tagName;
  $scope.paginate = function(tagName, skip, limit) {
    tagsService.getArticlesOfTag(tagName, skip, limit).then(function(response) {
      $scope.totalItems = response.data.totalCount;
      $scope.tagArticlesData = response.data.tips;
      if (angularGridInstance.tagArticles) {
        angularGridInstance.tagArticles.refresh();
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
      $state.go('main.tagArticles', { page: nmbr, searchstr: $scope.formData.searchString });

      $scope.search($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)));
    } else {
      $state.go('main.tagArticles', { page: nmbr, searchstr: $scope.formData.searchString });

      $scope.paginate($scope.tagName, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)), $scope.itemsPerPage);
    }

  };

  $scope.getIdForShare = function(getId) {
    $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
  };
  $scope.search = function(limit, skip, fromUser) {
    var searchText = $scope.formData.searchString;
    var pageLimit = limit >= 0 ? limit : configSettings.itemsPerPage;
    var pageSkip = skip >= 0 ? skip : 0;
    // if (pageSkip == 0) {
    //   $scope.currentPage = 1;
    // }
    $scope.issearch = true;
    $scope.noResults = false;
    if (fromUser) {
      if ($scope.pagination.currentPage == 1) {
        $state.go('main.tagArticles', { page: 1, searchstr: $scope.formData.searchString });
        tagsService.getArticlesOfTag($scope.tagName, pageSkip, pageLimit, searchText).then(function(response) {
          $scope.tagArticlesData = response.data.tips;
          $scope.totalItems = response.data.totalCount;
          if (angularGridInstance.tagArticles) {
            angularGridInstance.tagArticles.refresh();
          }

          if ($scope.tagArticlesData.length <= 0) {
            $scope.noResults = true;
          } else {
            angularGridInstance.tagArticles.refresh();
          }
        }, function(error) {
          console.log(error);
        });
      } else {
        $scope.pagination.currentPage = 1;
      }
    } else {
      tagsService.getArticlesOfTag($scope.tagName, pageSkip, pageLimit, searchText).then(function(response) {
        $scope.tagArticlesData = response.data.tips;
        $scope.totalItems = response.data.totalCount;
        if (angularGridInstance.tagArticles) {
          angularGridInstance.tagArticles.refresh();
        }

        if ($scope.tagArticlesData.length <= 0) {
          $scope.noResults = true;
        } else {
          angularGridInstance.tagArticles.refresh();
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
      $state.go('main.tagArticles', { page: 1, searchstr: $scope.formData.searchString });

      $scope.paginate($scope.tagName, 0, $scope.itemsPerPage);
    } else {
      $scope.pagination.currentPage = 1;
    }
  };

}]);
