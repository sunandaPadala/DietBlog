'use strict';
angular.module('dietBlog').controller('tagsCtrl', ['$scope', 'tagsList', function($scope, tagsList) {
  $scope.tagsList = tagsList.data;
  console.log($scope.tagsList);
}]);
