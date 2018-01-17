'use strict';
angular.module('dietBlog')
  .controller('mainviewCtrl', ['$scope', 'mainviewData', '$window', 'mainViewService', '$uibModal', '$state', 'tagsService', function($scope, mainviewData, $window, mainViewService, $uibModal, $state, tagsService) {
    $scope.mainviewData = mainviewData;
    $scope.recentPosts = [];

    mainViewService.coverblog().then(function(response) {
      $scope.coverblog = response.data;
      $scope.backgroundimg = {
        background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(' + response.data.images[0] + ') fixed center center'
      };
    }, function(error) {
      console.log(error);
    });

    mainViewService.recentPosts().then(function(response) {
      $scope.recentPosts = response.data;
    }, function(error) {
      console.log(error);
    });
    mainViewService.categories().then(function(response) {
      $scope.categories = response.data;
    }, function(error) {
      console.log(error);
    });
    tagsService.getAllTagsList().then(function(response) {
      $scope.tags = response.data;
    }, function(error) {
      console.log(error);
    });
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset > 150) {
        if (!$scope.mainviewData.scrollview) {
          $scope.mainviewData.scrollview = true;
          if (this.innerWidth > 767) {
            $scope.mainviewData.headerview = true;
          }
          $scope.$apply();
        }
      } else {
        if ($scope.mainviewData.scrollview) {
          $scope.mainviewData.scrollview = false;
          if (this.innerWidth > 767) {
            $scope.mainviewData.headerview = false;
          }
          $scope.$apply();
        }
      }
    });
    $scope.toggleMenu = function() {
      $scope.mainviewData.menuOpen = !$scope.mainviewData.menuOpen;
    };

    $scope.scrolltoTop = function() {
      $('body,html').animate({
        scrollTop: 0,
      }, 700);
    };

    $scope.mobmenutoggle = function() {
      if ($('.categ').is(':visible')) {
        $('.categ').slideUp();
      } else {
        $('.categ').slideDown();
      }
    };


    $scope.usersubscribe = function(email) {
      if ($scope.usersubscrip !== "") {
        mainViewService.subscribe(email).then(function(response) {
          console.log("loaded success");
          var modalInstance = $uibModal.open({
            template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',
            size: 'md',
            controller: function($scope) {
              $scope.message = response.data.message;
              $scope.title = "Right my diet";
              $scope.ok = function() {
                modalInstance.close();
              };
            }
          });

        }, function(msg) {
          var modalInstance = $uibModal.open({
            template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',
            
            // templateUrl: 'views/successModel.html',
            size: 'md',
            controller: function($scope) {
              $scope.message = msg;
              $scope.title = "Right my diet";
              $scope.ok = function() {
                modalInstance.close();
              };
            }
          });
        });
      } else {
        alert("enter valid email");
      }
    };
    $scope.goToCategories = function(categoryId) {
      $state.go('main.categories', { id: categoryId,page:1 });

    };
    $scope.goToFirstCategory=function(){
      $state.go('main.categories', { id: $scope.categories[0].id,page:1 });
     // console.log("categories",$scope.categories); 
    };
    $scope.goToTags = function() {
      $state.go('main.tags');
    };
    $scope.getTagArticles = function(tagName) {
      $state.go('main.tagArticles', { tagName: tagName,page:1 });
    }
    $scope.loadBlogDetails = function(pic) {
      $state.go('main.blogDetails', { id: pic.id });
    };
    $scope.gotoSearchView = function(searchStr) {
      console.log(searchStr);
      $state.go('main.search', { searchStr: searchStr,page:1 });
    };
  }]);
