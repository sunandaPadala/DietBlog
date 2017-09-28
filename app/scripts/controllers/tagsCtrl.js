'use strict';
angular.module('dietBlog').controller('tagsCtrl', ['$scope', 'tagsList', 'tagsService', '$state', function($scope, tagsList, tagsService, $state) {
  $scope.tagsList = tagsList.data;

  $scope.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  $scope.getTagArticles = function(tagName) {
    $state.go('main.tagArticles', { tagName: tagName });
  };

}]);
angular.module('dietBlog').filter('firstLetter', function() {
  return function(input, letter) {
    input = input || [];
    var out = [];
    input.forEach(function(item) {
      var title = item.name;
      if (title.charAt(0).toLowerCase() == letter) {
        out.push(item);
      }
    });
    return out;
  }
});
