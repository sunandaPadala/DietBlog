'use strict';
angular.module('dietBlog').controller('dietFormCtrl', ['$scope', 'mainViewService', '$uibModal', function($scope, mainViewService, $uibModal) {
  $scope.isMale = true;
  $scope.currentAilments = false;
  $scope.isDetail = false;
  $scope.isNv = true;
  $scope.changeCallback = function() {
    $scope.isDetail = !$scope.isDetail;
  };
  $scope.bookAppointment = function(event) {
    event.stopPropagation();
    // if ($scope.isMale)
    //   var gender = "male";
    // else
    //   var gender = "female";
    // if ($scope.isNv)
    //   var foodType = "nonveg";
    // else
    //   foodType = "veg";
    var dataObj = {
      ailments: $scope.currentAilments,
      age: $scope.age,
      email: $scope.email,
      name: $scope.name,
      gender: $scope.gender,
      height: $scope.height,
      weight: $scope.weight,
      region: $scope.indian,
      foodType: $scope.foodType,
      doctor: {
        name: $scope.doctor
      },
      description: $scope.comment
    };
    // if ($scope.currentAilments) {
    //   dataObj.description = $scope.duration;
    // }
    // alert("submit");
    mainViewService.bookAnAppointment(dataObj).then(function(response) {
      var modalInstance = $uibModal.open({
            template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',

        // templateUrl: 'views/successModel.html',
        size: 'md',
        controller: function($scope) {
          $scope.message = response.data.message;
          $scope.title = "Right my diet";
          $scope.ok = function() {
            modalInstance.close();
          };
        }
      });
    }, function(error) {
      console.log(error + "error");
      var modalInstance = $uibModal.open({
            template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',
        
        // templateUrl: 'views/successModel.html',
        size: 'md',
        controller: function($scope) {
          $scope.message = error.message;
          $scope.title = "Right my diet";
          $scope.ok = function() {
            modalInstance.close();
          };
        }
      });
    });
    /*code in callback*/
    document.getElementById("myForm").reset();
    $scope.isMale = true;
    $scope.currentAilments = false;
    $scope.isDetail = false;
    $scope.isNv = true;
    $scope.duration = '';
  }
}]);
