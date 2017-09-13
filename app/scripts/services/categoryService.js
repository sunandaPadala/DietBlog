'use strict';
var app = angular.module('dietBlog');
app.service('categoryService', ['$q', '$http', 'configSettings', function($q, $http, configSettings) {

  this.getArticlesByCategory = function(categoryId) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/' + categoryId + '/articlesAll';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.categoryArticlesSearch = function(categoryId, str, offset) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + ' /articles/:' + categoryId + '/:' + str + '/categoryarticlesSearch?skip=' + offset + '&limit=4';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };

}]);
