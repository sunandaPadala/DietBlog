'use strict';
angular.module('dietBlog').service('blogService', ['$q', '$http', 'configSettings', function($q, $http, configSettings) {

  this.getBlogs = function(limit, skip) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'all/articles?limit=' + limit + '&skip=' + skip;
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data.data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };

  this.getSpecificData = function(id) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/get/' + id + '/one';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data.data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.articlesSearch = function(searchString, limit, skip) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/' + searchString + '/searcharticles?skip=' + skip + '&limit=' + limit;
    limit;
    $http.get(requrl)
      .then(function(data) {
        data.data.searchString = searchString;
        deferred.resolve(data.data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };

  this.postComments = function(id, commentDetails) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/add/' + id + '/comment';
    $http.post(requrl, commentDetails)
      .then(function(resp) {
        deferred.resolve(resp);
      }, function(msg, code) {
        deferred.reject(msg);
      });

    return deferred.promise;
  };

}]);
