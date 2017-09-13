'use strict';
angular.module('dietBlog')
  .controller('mainviewCtrl', ['$scope', 'mainviewData', '$window', 'mainViewService', 'ReusableCalls', '$uibModal', '$state', function($scope, mainviewData, $window, mainViewService, rCall, $uibModal, $state) {
    console.log("main sfsd");
    $scope.mainviewData = mainviewData;
    $scope.recentPosts = [];

    mainViewService.coverblog().then(function(response) {
      $scope.coverblog = response.data.tips[0];
      $scope.backgroundimg = {
        background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(' + response.data.tips[0].images[0] + ') fixed center center'
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
        angular.element('.loadingIndicator').show();
        mainViewService.subscribe(email).then(function(response) {
          angular.element('.loadingIndicator').hide();
          console.log(response);
          //$scope.usersubscrip = "";
          //rCall.alertMessage("",response.data.message);
          var modalInstance = $uibModal.open({
            //animation: $ctrl.animationsEnabled,
            //ariaLabelledBy: 'modal-title-top',
            //ariaDescribedBy: 'modal-body-top',
            templateUrl: '../views/successModel.html',
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
          angular.element('.loadingIndicator').hide();
          console.log(msg);
          //rCall.alertMessage("",msg);
          var modalInstance = $uibModal.open({
            //animation: $ctrl.animationsEnabled,
            //ariaLabelledBy: 'modal-title-top',
            //ariaDescribedBy: 'modal-body-top',
            templateUrl: '../views/successModel.html',
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
      $state.go('main.categories', { id: categoryId });

    };

  }]);
