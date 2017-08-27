'use strict';
var app = angular.module('dietBlog');
app.service('blogService', ['$q', '$http', function() {
  this.loadImages = function() {
    var awesomeThings = [{
        'imgPath': '../images/8.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      },
      {
        'imgPath': '../images/1.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      },
      {
        'imgPath': '../images/2.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      },
      {
        'imgPath': '../images/3.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      },
      {
        'imgPath': '../images/4.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/5.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/16.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/7.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }, {
        'imgPath': '../images/8.jpg',
        'width': 300,
        'height': 400,
        'title': 'THIS IS A STANDARD POST WITH A PREVIEW IMAGE',
        "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus."
      }
    ];

    return awesomeThings;
  };

}]);
