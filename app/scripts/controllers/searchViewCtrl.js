'use strict';
angular.module('dietBlog')
  .controller('searchViewCtrl', function($scope, $state, blogService, angularGridInstance, configSettings, searchData) {
    $scope.searchItems = searchData.tips;
    $scope.searchText = searchData.searchString;
    $scope.pagination = {
      currentPage: 1
    };

    $scope.itemsPerPage = configSettings.itemsPerPage;
    $scope.totalItems = searchData.totalCount;
    $scope.issearch = true;
    $scope.formData = {};
    $scope.noResults = false;
    $scope.formData.searchString = $scope.searchText;
    /* if (searchData) {
       $scope.pagination.currentPage = searchData.currentPage;
       $scope.totalItems = searchData.totalCount;
       $scope.searchItems = searchData.tips;
       if (angularGridInstance.searchGrid) {
         angularGridInstance.searchGrid.refresh();
       }
       if ($state.params.page !== searchData.currentPage) {
         $state.go('main.blog', { page: searchData.currentPage });
       }
     }*/
    if ($scope.totalItems <= 0) {
      $scope.noResults = true;
    }
    $scope.paginate = function(searchText, pageLimit, pageSkip) {
      blogService.articlesSearch(searchText, pageLimit, pageSkip).then(function(response) {
        $scope.totalItems = response.totalCount;
        $scope.searchItems = response.tips;
        if (angularGridInstance.searchGrid) {
          angularGridInstance.searchGrid.refresh();
        }
      }, function(error) {
        console.log(error);
      });
    };
    $scope.loadBlogDetails = function(pic) {
      $state.go('main.blogDetails', { id: pic.id });
    };
    $scope.pageChangeHandler = function(nmbr) {

      $scope.paginate($scope.searchText, $scope.itemsPerPage, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)));
    };

    $scope.getIdForShare = function(getId) {
      $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
    };
    $scope.search = function() {
      $scope.noResults = false;

      if (true) {
        var searchText = $scope.formData.searchString;
        $scope.searchText = searchText;
        var pageLimit = configSettings.itemsPerPage;
        var pageSkip = 0;
        blogService.articlesSearch(searchText, pageLimit, pageSkip).then(function(response) {
          $scope.searchItems = response.tips;
          $scope.totalItems = response.totalCount;
          if (angularGridInstance.searchGrid) {
            angularGridInstance.searchGrid.refresh();
          }

          if ($scope.searchItems.length <= 0) {
            $scope.noResults = true;
          } else {
            angularGridInstance.searchGrid.refresh();
          }
        }, function(error) {
          console.log(error);
        });
        /*if (fromUser) {
          if ($scope.pagination.currentPage == 1) {
            blogService.articlesSearch(searchText, pageLimit, pageSkip).then(function(response) {
              $scope.searchItems = response.tips;
              $scope.totalItems = response.totalCount;
              if (angularGridInstance.searchGrid) {
                angularGridInstance.searchGrid.refresh();
              }

              if ($scope.searchItems.length <= 0) {
                $scope.noResults = true;
              } else {
                angularGridInstance.searchGrid.refresh();
              }
            }, function(error) {
              console.log(error);
            });
          } else {
            $scope.pagination.currentPage = 1;
          }

        } else {
          blogService.articlesSearch(searchText, pageLimit, pageSkip).then(function(response) {
            $scope.searchItems = response.tips;
            $scope.totalItems = response.totalCount;
            if (angularGridInstance.searchGrid) {
              angularGridInstance.searchGrid.refresh();
            }

            if ($scope.searchItems.length <= 0) {
              $scope.noResults = true;
            } else {
              angularGridInstance.searchGrid.refresh();
            }
          }, function(error) {
            console.log(error);
          });
        }*/
        $scope.issearch = true;
      }

    };
    $scope.cancel = function() {
      $scope.formData.searchString = '';
      $scope.searchText = '';
      $scope.issearch = false;
      $scope.noResults = false;
      /*if ($scope.pagination.currentPage == 1) {
        $scope.paginate($scope.searchText, $scope.itemsPerPage, 0);
      } else {
        $scope.pagination.currentPage = 1;
      }*/
      //  $scope.paginate($scope.searchText, $scope.itemsPerPage, 0);
      $state.go('main.blog', { page: 1 });
    };

  });
