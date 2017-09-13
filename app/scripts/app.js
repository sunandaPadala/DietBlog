'use strict';

/**
 * @ngdoc overview
 * @name dietBlog
 * @description
 * # dietBlog
 *
 * Main module of the application.
  'wu.masonry',
    
 */

angular
  .module('dietBlog', [
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ngCookies',
    'ngResource',
    'ngTouch',
    'ui.router',
    'angularGrid',
    '720kb.socialshare',
    'angularUtils.directives.dirPagination'
  ]).constant('configSettings', {
    'baseUrl': 'https://right-my-diet.herokuapp.com/',
    'someElseSetting': 'settingValue'
    //other setting will also be there.
  }).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/blog/1');
    $stateProvider.state('main', {
        abstract: true,
        url: "",
        resolve: {
          mainviewData: function() {
            return {
              menuOpen: false,
              scrollview: false,
              headerview: false
            };
          }
        },
        views: {
          '': {
            templateUrl: "views/main.html",
            controller: "mainviewCtrl"

          },
          'nav@main': {
            templateUrl: "views/about.html",
            // controller:"mainviewCtrl"
          },
          'footer@main': {
            templateUrl: "views/footer.html",
            // controller:"mainviewCtrl"

          },
          'mobileMenu@main': {
            templateUrl: "views/mobilemenu.html",
            // controller:"mainviewCtrl"

          },
        }
      }).state('main.home', {
        url: '/home',
        templateUrl: "views/home.html"
      })
      // .state('main.about', {
      //   url: '/about',
      //   templateUrl: "views/about.html"
      // })
      .state('main.blog', {
        url: '/blog/:page',
        views: {
          '': {
            templateUrl: "views/blog.html",
            controller: 'MainCtrl'
          },
          'grid@main.blog': {
            templateUrl: "views/blogGrid.html"
          },
          'right@main.blog': {
            templateUrl: "views/blogRight.html"
          }
        },
        params: {
          page: {
            dynamic: true,
            value: 1,
            type: "int"
          },
          itemsPerPage: 4
        },
        resolve: {
          gridData: ['blogService', '$stateParams', '$q', function(blogService, $stateParams, $q) {
            var deferred = $q.defer();
            blogService.getBlogs($stateParams.itemsPerPage, ($stateParams.itemsPerPage * ($stateParams.page - 1)))
              .then(function(response) {
                var reqObj = {};
                if (response.tips.length) {
                  // reqObj=response;
                  response['currentPage'] = $stateParams.page;
                  deferred.resolve(response);
                } else {
                  blogService.getBlogs($stateParams.itemsPerPage, ($stateParams.itemsPerPage * (1 - 1))).then(function(response) {
                    response['currentPage'] = 1;
                    deferred.resolve(response);
                  }, function(error) {
                    deferred.reject(error);
                  });
                }
              }, function(error) {
                console.log("failed to resolve state");
                deferred.reject(error);
              });
            return deferred.promise;
          }],

        }
        // ,
        // resolvePolicy: { async: 'WAIT',when:'EAGER' },
        // redirectTo:function(trans){
        // //   console.log("in redirec");
        //   var resolvePromise = trans.injector().getAsync('gridData');
        //   // if(trans.params().page !== )

        //    return resolvePromise.then(function(response){
        //       console.log(response);
        //       if(trans.params().page !== response.currentPage){
        //         return { state: 'main.blog', params: { page: response.currentPage,itemsPerPage:4 } };
        //       }
        //       // if(!response.tips.length){
        //        // return { state: 'main.blog', params: { page: 1,itemsPerPage:4 } };
        //       // }
        //   },function(error){
        //     console.log(error);
        //   });
        // }

      }).state('main.blogDetails', {
        url: '/blogDetails/:id',
        templateUrl: "views/blogDetails.html",
        controller: "blogDetailsCtrl",
        resolve: {
          blogDetails: ['blogService', '$stateParams', function(blogService, $stateParams) {
            return blogService.getSpecificData($stateParams.id);
          }]
        }
      }).state('main.categories', {
        url: '/categories/:id',
        templateUrl: "views/categories.html",
        controller: "categoriesCtrl",
        resolve: {
          categoryArticles: ['mainViewService', '$stateParams', function(mainViewService, $stateParams) {
            return mainViewService.getArticlesByCategory($stateParams.id);
          }]
        }
      });
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

  }).directive("okPopUp", function() {
    return {
      restrict: "E",
      templateUrl: "views/OkPopup.html",
      transclude: true,
      link: function($scope, element, attrs, pageCtrl) {
        $scope.closepopup = function() {
          $("#okPopUp").css('display', 'none');
        };
      }
    };
  });
