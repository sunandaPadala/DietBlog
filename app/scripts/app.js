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
  }).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/blog');
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
        url: '/blog',
        views: {
          '': {
            templateUrl: "views/blog.html",
            controller: 'MainCtrl'
          },
          'grid@main.blog': {
            templateUrl: "views/blogGrid.html",
            // controller: "MainCtrl"
          },
          'right@main.blog': {
            templateUrl: "views/blogRight.html"
          }
        }
      }).state('main.blogDetails', {
        url: '/blogDetails',
        templateUrl: "views/blogDetails.html",
        controller: "blogDetailsCtrl"
      });
  });
