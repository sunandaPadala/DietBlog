'use strict';
angular.module('dietBlog').controller('tagsCtrl', ['$scope', 'tagsList', function($scope, tagsList) {
  $scope.tagsList = tagsList.data.tips;
  console.log($scope.tagsList);
}]);
