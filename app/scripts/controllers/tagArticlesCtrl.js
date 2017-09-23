'use strict';
angular.module('dietBlog').controller('tagArticlesCtrl', ['$scope', 'tagArticles', 'tagsService', 'angularGridInstance', '$state', 'configSettings', function($scope, tagArticles, tagsService, angularGridInstance, $state, configSettings) {
  $scope.tagArticlesData = tagArticles.data.tips;
  $scope.currentPage = 1;
  $scope.itemsPerPage = configSettings.itemsPerPage;
  $scope.issearch = false;
  $scope.formData = {};
  $scope.noResults = false;
  $scope.totalItems = tagArticles.data.totalCount;
  var tagName = tagArticles.tagName;
  $scope.paginate = function(tagName, skip, limit) {
    tagsService.getArticlesOfTag(tagName, skip, limit).then(function(response) {
      $scope.totalItems = response.data.totalCount;
      $scope.tagArticlesData = response.data.tips;
      if (angularGridInstance.category) {
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
    $scope.currentPage = nmbr;
    if ($scope.issearch) {
      $scope.search($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.currentPage - 1)));
    } else {
      $scope.paginate(tagName, ($scope.itemsPerPage * ($scope.currentPage - 1)), $scope.itemsPerPage);
    }

  };

  $scope.getIdForShare = function(getId) {
    $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
  };
  $scope.search = function(limit, skip) {
    var searchText = $scope.formData.searchString;
    var pageLimit = limit >= 0 ? limit : 2;
    var pageSkip = skip >= 0 ? skip : 0;
    if (pageSkip == 0) {
      $scope.currentPage = 1;
    }
    tagsService.getArticlesOfTag(tagName, pageSkip, pageLimit, searchText).then(function(response) {
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


    $scope.issearch = true;
  };
  $scope.cancel = function() {
    $scope.formData.searchString = '';
    $scope.issearch = false;
    $scope.noResults = false;
    $scope.paginate(tagName, 0, $scope.itemsPerPage);
  };

}]);
