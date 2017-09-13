'use strict';
angular.module('dietBlog').controller('categoriesCtrl', ['$scope', 'categoryArticles', function($scope, categoryArticles) {
  $scope.categoryData = categoryArticles.data;

}]);
