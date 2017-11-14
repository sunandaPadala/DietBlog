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
    if ($scope.isMale)
      var gender = "male";
    else
      var gender = "female";
    if ($scope.isNv)
      var foodType = "nonveg";
    else
      foodType = "veg";
    var dataObj = {
      ailments: $scope.currentAilments,
      age: $scope.age,
      email: $scope.email,
      name: $scope.name,
      gender: gender,
      height: $scope.height,
      weight: $scope.weight,
      region: $scope.indian,
      foodType: foodType,
      doctor: {
        name: $scope.doctor
      }
    };
    if ($scope.currentAilments) {
      dataObj.description = $scope.duration;
    }
    // alert("submit");
    mainViewService.bookAnAppointment(dataObj).then(function(response) {
      var modalInstance = $uibModal.open({
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
    }, function(error) {
      console.log(error + "error");
      var modalInstance = $uibModal.open({
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
