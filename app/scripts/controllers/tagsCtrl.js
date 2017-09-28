'use strict';
angular.module('dietBlog').controller('tagsCtrl', ['$scope', 'tagsList', 'tagsService', '$state', function($scope, tagsList, tagsService, $state) {
  $scope.tagsList = tagsList.data;

  $scope.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  /* $scope.alphabet = [{
     letter: 'a',
     close: false
   }, {
     letter: 'b',
     close: false
   }, {
     letter: 'c',
     close: false
   }, {
     letter: 'd',
     close: false
   }, {
     letter: 'e',
     close: false
   }, {
     letter: 'f',
     close: false
   }, {
     letter: 'g',
     close: false
   }, {
     letter: 'h',
     close: false
   }, {
     letter: 'i',
     close: false
   }, {
     letter: 'j',
     close: false
   }, {
     letter: 'k',
     close: false
   }, {
     letter: 'l',
     close: false
   }, {
     letter: 'm',
     close: false
   }, {
     letter: 'n',
     close: false
   }, {
     letter: 'o',
     close: false
   }, {
     letter: 'p',
     close: false
   }, {
     letter: 'q',
     close: false
   }, {
     letter: 'r',
     close: false
   }, {
     letter: 's',
     close: false
   }, {
     letter: 't',
     close: false
   }, {
     letter: 'u',
     close: false
   }, {
     letter: 'v',
     close: false
   }, {
     letter: 'w',
     close: false
   }, {
     letter: 'x',
     close: false
   }, {
     letter: 'y',
     close: false
   }, {
     letter: 'z',
     close: false
   }];*/
  /*$scope.status = {
    isOpen: true
  };*/
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
