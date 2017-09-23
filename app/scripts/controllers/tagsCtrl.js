'use strict';
angular.module('dietBlog').controller('tagsCtrl', ['$scope', 'tagsList', 'tagsService', '$state', function($scope, tagsList, tagsService, $state) {
  $scope.tagsList = tagsList.data;
  $scope.getTagArticles = function(tagName) {
    $state.go('main.tagArticles', { tagName: tagName });
  }
}]);
