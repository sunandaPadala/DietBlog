'use strict';
angular.module('dietBlog').controller('dietFormCtrl', ['$scope', function($scope) {
  $scope.isMale = true;
  $scope.currentAilments = false;
  $scope.isDetail = false;
  $scope.isNv = true;
  $scope.changeCallback = function() {
    $scope.isDetail = !$scope.isDetail;
  };
  $scope.bookAppointment = function() {
    alert("submitted");
    if ($scope.currentAilments) {
      alert($scope.currentAilments);
    }
    if ($scope.isMale)
      var gender = "male";
    else
      var gender = "female";
    if ($scope.isNv)
      var foodType = "nonveg";
    else
      foodType = "veg";
    var dataObj = {
      name: $scope.name,
      gender: gender,
      age: $scope.age,
      height: $scope.height,
      weight: $scope.weight,
      indian: $scope.indian,
      duration: $scope.duration,
      email: $scope.email,
      doctor: $scope.doctor,
      foodType: foodType
    }
    console.log(dataObj);
    /*code in callback*/
    document.getElementById("myForm").reset();
    $scope.isMale = true;
    $scope.currentAilments = false;
    $scope.isDetail = false;
    $scope.isNv = true;
    $scope.duration = '';
  }
}]);
