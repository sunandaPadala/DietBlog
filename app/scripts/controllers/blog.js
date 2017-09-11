'use strict';
angular.module('dietBlog')
  .controller('MainCtrl', function($scope, $state, blogService, angularGridInstance, myService, configSettings) {
    $scope.awesomeThings = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 4;
    $scope.totalItems = 0;
    $scope.issearch = false;
    $scope.formData = {};
    $scope.noResults = false;
    $scope.paginate = function(limit, skip) {
      blogService.getBlogs(limit, skip).then(function(response) {
        angular.element('.loadingIndicator').hide();
        $scope.totalItems = response.totalCount;
        $scope.awesomeThings = response.tips;
        if (angularGridInstance.gallery) {
          angularGridInstance.gallery.refresh();
        }
      }, function(error) {
        console.log(error);
        angular.element('.loadingIndicator').hide();
      });
    };
    $scope.paginate($scope.itemsPerPage, 0);
    $scope.loadBlogDetails = function(pic) {
      angular.element('.loadingIndicator').show();
      //myService.setter(pic);
      $state.go('main.blogDetails', { id: pic.id });
      $("html, body").animate({ scrollTop: 0 }, 0);
    };
    $scope.pageChangeHandler = function(nmbr) {
      angular.element('.loadingIndicator').show();
      $scope.currentPage = nmbr;
      $scope.paginate($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.currentPage - 1)));
      $("html, body").animate({ scrollTop: $('#gridcontainer').offset().top - 50 }, 500);
    };

    $scope.getIdForShare = function(getId) {
      $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
    };
    $scope.search = function() {
      var searchText = $scope.formData.searchString;
      blogService.articlesSearch(searchText).then(function(response) {
        $scope.awesomeThings = response;
        $scope.totalItems = $scope.awesomeThings.length;
        if (angularGridInstance.gallery) {
          angularGridInstance.gallery.refresh();
        }

        if ($scope.awesomeThings.length <= 0) {
          $scope.noResults = true;
        } else {
          angularGridInstance.gallery.refresh();
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

  });
