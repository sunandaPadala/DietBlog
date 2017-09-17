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
  }).config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
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
            templateUrl: "views/nav.html",
            controller: "navCtrl"
          },
          'footer@main': {
            templateUrl: "views/footer.html",
            // controller:"mainviewCtrl"

          },
          'mobileMenu@main': {
            templateUrl: "views/mobilemenu.html",
            controller: "navCtrl"

          },
        }
      }).state('main.home', {
        url: '/home',
        templateUrl: "views/home.html"
      })
      .state('main.about', {
        url: '/about',
        templateUrl: "views/about.html"
      })
      .state('main.blog', {
        url: '/blog/:page',
        views: {
          '': {
            templateUrl: "views/blog.html",
            controller: 'blogCtrl'
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
          categoryArticles: ['categoryService', '$stateParams', function(categoryService, $stateParams) {
            return categoryService.getArticlesByCategory($stateParams.id, 0, 1);
          }]
        }
      }).state('main.tags', {
        url: '/tags/:tagName',
        templateUrl: "views/tags.html",
        controller: "tagsCtrl",
        resolve: {
          tagsList: ['tagsService', '$stateParams', function(tagsService, $stateParams) {
            return tagsService.getArticlesOfTag($stateParams.tagName, 0, 4);
          }]
        }
      });
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
angular.module('dietBlog').service('LoadingInterceptor', ['$q', '$rootScope', '$log',
  function($q, $rootScope, $log) {
    'use strict';
    $rootScope.loading = 0;

    return {
      request: function(config) {
        $rootScope.loading++;
        return config;
      },
      requestError: function(rejection) {
        $rootScope.loading--;
        $log.error('Request error:', rejection);
        return $q.reject(rejection);
      },
      response: function(response) {
        $rootScope.loading--;
        return response;
      },
      responseError: function(rejection) {
        $rootScope.loading--;
        $log.error('Response error:', rejection);
        return $q.reject(rejection);
      }
    };
  }
]);
angular.module('dietBlog').run(function($rootScope, $location) {
  $rootScope.location = $location;
});
