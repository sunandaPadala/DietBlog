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
      console.log("success",$uibModal);
       $scope.message = response.data.message;
          $scope.title = $scope.doctor;
      var modalInstance = $uibModal.open({
            // template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',

        templateUrl: 'views/successModel.html',
        size: 'md',
         scope:$scope,
        controller: 'ModalInstanceCtrl',
        controllerAs: '$ctrl'
      });
    }, function(error) {
      console.log("error",$uibModal);
        $scope.message = error.message;
          $scope.title = "Right my diet";
      var modalInstance = $uibModal.open({
            // template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',
        
        templateUrl: 'views/successModel.html',
        size: 'md',
         scope:$scope,
        controller: 'ModalInstanceCtrl',
        controllerAs: '$ctrl'
      });
    });
    /*code in callback*/
    document.getElementById("myForm").reset();
    // $scope.isMale = true;
    // $scope.currentAilments = false;
    // $scope.isDetail = false;
    // $scope.isNv = true;
    // $scope.duration = '';
    $scope.myForm.$setPristine();
      $scope.myForm.$setUntouched();
      $scope.myForm.$submitted = false;
  };
}]);
