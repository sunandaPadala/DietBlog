'use strict';
var app = angular.module('dietBlog');
app.service('blogService', ['$q', '$http', 'configSettings', function($q, $http, configSettings) {

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
  this.articlesSearch = function(searchString) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/:' + searchString + '/searcharticles?skip=0&limit=5';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data.data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };

}]);

app.factory("myService", function() {
  var theValue = {};
  theValue.setter = function(newValue) {
    theValue.value = newValue;
  }
  theValue.getter = function() {
    return theValue.value;
  }
  return theValue;
});

app
  .factory("ReusableCalls", ["$timeout", "$state",
    function($timeout, $state) {
      var obj = {};
      obj.alertMessage = function(ttl, msg) {
        $timeout(function() {
          var scope = angular.element("#okPopUp").scope();
          scope.title = ttl;
          scope.message = msg;
          $("#okPopUp").css('display', 'block');
          scope.OkPopup = function() {
            console.log("Ok Button");
            $("#okPopUp").css('display', 'none');
          };
          scope.cancel = function() {
            $("#okPopUp").css('display', 'none');
            console.log("OK popup closed clicked");
          };

        });
      };
      return obj;
    }
  ]);
