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
    'ngCookies',
    'ngResource',
    'ngTouch',
    'ui.router',
    'angularGrid'
  ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/blog');
    $stateProvider.state('main', {
      abstract: true,
      url: "",
      views: {
        '': {
          templateUrl: "views/main.html"
        },
        'nav@main': {
          templateUrl: "views/nav.html"
        },
        'footer@main': {
          templateUrl: "views/footer.html"
        }
      }
    }).state('main.home', {
      url: '/home',
      templateUrl: "views/home.html"
    }).state('main.about', {
      url: '/home',
      templateUrl: "views/about.html"
    }).state('main.blog', {
      url: '/blog',
      views: {
        '': {
          templateUrl: "views/blog.html"
        },
        'grid@main.blog': {
          templateUrl: "views/blogGrid.html",
          controller: "MainCtrl"
        },
        'right@main.blog': {
          templateUrl: "views/blogRight.html"
        }
      }
    });
  });
