'use strict';
angular.module('dietBlog').service('tagsService', ['$q', '$http', 'configSettings', function($q, $http, configSettings) {

  this.getAllTagsList = function() {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'tags/list/all';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.getArticlesOfTag = function(tagName, skip, limit, str) {
    if (str === undefined) {
      str = '';
    }
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/' + tagName + '/list?str=' + str + '&skip=' + skip + '&limit=' + limit;
    $http.get(requrl)
      .then(function(data) {
        data.tagName = tagName;
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };

}]);
