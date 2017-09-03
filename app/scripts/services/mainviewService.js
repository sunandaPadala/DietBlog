'use strict';
var app = angular.module('dietBlog');
app.service('mainViewService', ['$q', '$http','configSettings', function($q, $http,configSettings) {
  this.recentPosts = function() {
   
    var deferred = $q.defer();
    var requrl=configSettings.baseUrl+'articles/list/recent';
     $http.get(requrl)
       .then(function(data) { 
          deferred.resolve(data);
       },function(msg, code) {
          deferred.reject(msg);
       });
     return deferred.promise;
  };
  this.categories = function() {
   
    var deferred = $q.defer();
    var requrl=configSettings.baseUrl+'category/list/all';
     $http.get(requrl)
       .then(function(data) { 
          deferred.resolve(data);
       },function(msg, code) {
          deferred.reject(msg);
       });
     return deferred.promise;
  };
   this.subscribe = function(email) {
   
    var deferred = $q.defer();
    var requrl=configSettings.baseUrl+'user/subscribe/app';
    var data={};
    data['email']=email;
     $http.post(requrl,data)
       .then(function(data) { 
          deferred.resolve(data);
       },function(msg, code) {
          deferred.reject(msg);
       });
     return deferred.promise;
  };

   this.coverblog = function() {
   
    var deferred = $q.defer();
    var requrl=configSettings.baseUrl+'all/articles?limit=10';
    $http.get(requrl)
       .then(function(data) { 
          deferred.resolve(data);
       },function(msg, code) {
          deferred.reject(msg);
       });
     return deferred.promise;
  };


}]);
