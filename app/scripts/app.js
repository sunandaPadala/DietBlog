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
    'ngAnimate',
    'ngSanitize',
     'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngTouch',
    'ui.router',
    'angularGrid',
    '720kb.socialshare',
    'angularUtils.directives.dirPagination',
    'uiSwitch'
  ]).constant('configSettings', {
    // 'baseUrl': 'https://right-my-diet.herokuapp.com/',
    'baseUrl': 'https://right-my-diet123.appspot.com/',
    'someElseSetting': 'settingValue',
    'itemsPerPage': 4
    //other setting will also be there.
  }).config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,$qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
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
            templateUrl: "views/nav.html"
          },
          'footer@main': {
            templateUrl: "views/footer.html",
            // controller:"mainviewCtrl"

          },
          'mobileMenu@main': {
            templateUrl: "views/mobilemenu.html"

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
          gridData: ['blogService', '$stateParams', '$q', 'configSettings', function(blogService, $stateParams, $q, configSettings) {
            var deferred = $q.defer();
            blogService.getBlogs(configSettings.itemsPerPage, (configSettings.itemsPerPage * ($stateParams.page - 1)))
              .then(function(response) {
                var reqObj = {};
                if (response.tips.length) {
                  response['currentPage'] = $stateParams.page;
                  deferred.resolve(response);
                } else {
                  blogService.getBlogs(configSettings.itemsPerPage, (configSettings.itemsPerPage * (1 - 1))).then(function(response) {
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
        url: '/categories/:id/:page/:searchstr',
        templateUrl: "views/categories.html",
        controller: "categoriesCtrl",
        resolve: {
          categoryArticles: ['categoryService', '$stateParams', 'configSettings', function(categoryService, $stateParams, configSettings) {
            if ($stateParams.page && $stateParams.searchstr) {
              return categoryService.categoryArticlesSearch($stateParams.id, $stateParams.searchstr, (configSettings.itemsPerPage * ($stateParams.page - 1)), configSettings.itemsPerPage);
            } else {
              return categoryService.getArticlesByCategory($stateParams.id, (configSettings.itemsPerPage * ($stateParams.page - 1)), configSettings.itemsPerPage);
            }
          }]
        },
        params: {
          page: {
            dynamic: true,
            value: 1,
            type: "int"
          },
          searchstr: {
            dynamic: true,
            value: ''
          }
        }
      }).state('main.tags', {
        url: '/tags',
        templateUrl: "views/tags.html",
        controller: "tagsCtrl",
        resolve: {
          tagsList: ['tagsService', function(tagsService) {
            return tagsService.getAllTagsList();
          }]
        }
      }).state('main.tagArticles', {
        url: '/tagArticles/:tagName/:page/:searchstr',
        templateUrl: "views/tagArticles.html",
        controller: "tagArticlesCtrl",
        resolve: {
          tagArticles: ['tagsService', '$stateParams', 'configSettings', function(tagsService, $stateParams, configSettings) {
            if ($stateParams.page && $stateParams.searchstr) {
              return tagsService.getArticlesOfTag($stateParams.tagName, (configSettings.itemsPerPage * ($stateParams.page - 1)), configSettings.itemsPerPage, $stateParams.searchstr);
            } else {
              return tagsService.getArticlesOfTag($stateParams.tagName, (configSettings.itemsPerPage * ($stateParams.page - 1)), configSettings.itemsPerPage);

            }
          }]
        },
        params: {
          page: {
            dynamic: true,
            value: 1,
            type: "int"
          },
          searchstr: {
            dynamic: true,
            value: ''
          }
        }
      }).state('main.contact', {
        url: '/contact',
        templateUrl: "views/contact.html"
      }).state('main.doctors', {
        url: '/doctors',
        templateUrl: "views/doctorsGrid.html",
        controller: 'doctorsCtrl'
      }).state('main.search', {
        url: '/search/:page/:searchStr',
        templateUrl: "views/searchView.html",
        controller: 'searchViewCtrl',
        params: {
          page: {
            dynamic: true,
            value: 1,
            type: "int"
          },
          searchStr: {
            dynamic: true
          }
          //itemsPerPage: 4
        },
        resolve: {
          searchData: ['blogService', '$stateParams', 'configSettings', '$q', function(blogService, $stateParams, configSettings, $q) {
            return blogService.articlesSearch($stateParams.searchStr, configSettings.itemsPerPage, configSettings.itemsPerPage * ($stateParams.page - 1));
          }]
        }
      }).state('main.dietForm', {
        url: '/bookAppointment',
        templateUrl: "views/dietForm.html",
        controller: 'dietFormCtrl'
      });
    $locationProvider.hashPrefix('');

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
angular.module('dietBlog').run(function($rootScope, $location, $state) {
  $rootScope.location = $location;
  $state.defaultErrorHandler(function(error) {
    // This is a naive example of how to silence the default error handler.
    console.log("state change failed navigating to home page");
    $state.go('main.blog', { page: 1 });
  });
});
