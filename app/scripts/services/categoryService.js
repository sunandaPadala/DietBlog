'use strict';
angular.module('dietBlog').service('categoryService', ['$q', '$http', 'configSettings', function($q, $http, configSettings) {

  this.getArticlesByCategory = function(categoryId, skip, limit) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/' + categoryId + '/articlesAll?skip=' + skip + '&limit=' + limit;
    $http.get(requrl)
      .then(function(data) {
        data.categoryId = categoryId;
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.categoryArticlesSearch = function(categoryId, str, skip, limit) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/' + categoryId + '/articlesAll?str=' + str + '&skip=' + skip + '&limit=' + limit;
    $http.get(requrl)
      .then(function(data) {
        data.categoryId = categoryId;
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };

}]);
