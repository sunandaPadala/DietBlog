'use strict';
angular.module('dietBlog')
  .controller('mainviewCtrl',['$scope','mainviewData', function($scope,mainviewData) {
  	console.log("main sfsd");
  	$scope.mainviewData=mainviewData;
  	$scope.toggleMenu=function(){
  		console.log(mainviewData);
  		$scope.mainviewData.menuOpen=!$scope.mainviewData.menuOpen;
  	}
  }]);
