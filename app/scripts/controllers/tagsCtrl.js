'use strict';
angular.module('dietBlog').controller('tagsCtrl', ['$scope', 'tagsList', 'tagsService', '$state', function($scope, tagsList, tagsService, $state) {
  $scope.tagsList = tagsList.data;
  $scope.getTagArticles = function(tagName) {
    $state.go('main.tagArticles', { tagName: tagName });
  }
}]);

angular.module('dietBlog').controller('doctorsCtrl', ['$scope', function($scope) {
  $scope.doctorsList = [{
      "title": "Anjali Vishwanath",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor1.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [
        "health",
        "fitness"
      ],
      "postType": "",
      "genderSpecific": [],
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "views": [],
      "comments": [],
      "categoryName": "Fitness",
      "status": "ACTIVE",
      "createdAt": "2017-09-13T18:26:43.725Z",
      "updatedAt": "2017-09-13T18:26:43.725Z",
      "coverBlog": false,
      "id": "59b97863f698d5040043e264"
    },
    {
      "title": "Gurunath Khandale",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor2.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [],
      "postType": "image",
      "genderSpecific": [
        "male"
      ],
      "menSpecific": false,
      "womenSpecific": false,
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "status": "ACTIVE",
      "createdAt": "2017-05-30T03:08:38.123Z",
      "updatedAt": "2017-05-30T07:54:58.400Z",
      "comments": [],
      "coverBlog": true,
      "id": "592ce2366261e104007c5fc5"
    }, {
      "title": "Anjali Vishwanath",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor1.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [
        "health",
        "fitness"
      ],
      "postType": "",
      "genderSpecific": [],
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "views": [],
      "comments": [],
      "categoryName": "Fitness",
      "status": "ACTIVE",
      "createdAt": "2017-09-13T18:26:43.725Z",
      "updatedAt": "2017-09-13T18:26:43.725Z",
      "coverBlog": false,
      "id": "59b97863f698d5040043e264"
    },
    {
      "title": "Gurunath Khandale",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor2.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [],
      "postType": "image",
      "genderSpecific": [
        "male"
      ],
      "menSpecific": false,
      "womenSpecific": false,
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "status": "ACTIVE",
      "createdAt": "2017-05-30T03:08:38.123Z",
      "updatedAt": "2017-05-30T07:54:58.400Z",
      "comments": [],
      "coverBlog": true,
      "id": "592ce2366261e104007c5fc5"
    }, {
      "title": "Anjali Vishwanath",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor1.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [
        "health",
        "fitness"
      ],
      "postType": "",
      "genderSpecific": [],
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "views": [],
      "comments": [],
      "categoryName": "Fitness",
      "status": "ACTIVE",
      "createdAt": "2017-09-13T18:26:43.725Z",
      "updatedAt": "2017-09-13T18:26:43.725Z",
      "coverBlog": false,
      "id": "59b97863f698d5040043e264"
    },
    {
      "title": "Gurunath Khandale",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor2.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [],
      "postType": "image",
      "genderSpecific": [
        "male"
      ],
      "menSpecific": false,
      "womenSpecific": false,
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "status": "ACTIVE",
      "createdAt": "2017-05-30T03:08:38.123Z",
      "updatedAt": "2017-05-30T07:54:58.400Z",
      "comments": [],
      "coverBlog": true,
      "id": "592ce2366261e104007c5fc5"
    }, {
      "title": "Anjali Vishwanath",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor1.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [
        "health",
        "fitness"
      ],
      "postType": "",
      "genderSpecific": [],
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "views": [],
      "comments": [],
      "categoryName": "Fitness",
      "status": "ACTIVE",
      "createdAt": "2017-09-13T18:26:43.725Z",
      "updatedAt": "2017-09-13T18:26:43.725Z",
      "coverBlog": false,
      "id": "59b97863f698d5040043e264"
    },
    {
      "title": "Gurunath Khandale",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor2.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [],
      "postType": "image",
      "genderSpecific": [
        "male"
      ],
      "menSpecific": false,
      "womenSpecific": false,
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "status": "ACTIVE",
      "createdAt": "2017-05-30T03:08:38.123Z",
      "updatedAt": "2017-05-30T07:54:58.400Z",
      "comments": [],
      "coverBlog": true,
      "id": "592ce2366261e104007c5fc5"
    }, {
      "title": "Anjali Vishwanath",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor1.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [
        "health",
        "fitness"
      ],
      "postType": "",
      "genderSpecific": [],
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "views": [],
      "comments": [],
      "categoryName": "Fitness",
      "status": "ACTIVE",
      "createdAt": "2017-09-13T18:26:43.725Z",
      "updatedAt": "2017-09-13T18:26:43.725Z",
      "coverBlog": false,
      "id": "59b97863f698d5040043e264"
    },
    {
      "title": "Gurunath Khandale",
      "description": "<p>Anjali has a Master of Science in nutrition from Osmania University, Hyderabad. She is aregistered dietitian with the NIN and a  member of Indian Dietetic Association.<br/>Has twelve years practice in hospital dietetics as well as public health and early intervention dietetic besides coordinating care between families, physicians and other medical professionals.</p>\n",
      "images": ['../../images/doctor2.png'],
      "videos": [],
      "category": "Fitness",
      "tags": [],
      "postType": "image",
      "genderSpecific": [
        "male"
      ],
      "menSpecific": false,
      "womenSpecific": false,
      "videoLink": "",
      "userId": "59b8da47cb3de40400b22850",
      "likes": [],
      "favourites": [],
      "status": "ACTIVE",
      "createdAt": "2017-05-30T03:08:38.123Z",
      "updatedAt": "2017-05-30T07:54:58.400Z",
      "comments": [],
      "coverBlog": true,
      "id": "592ce2366261e104007c5fc5"
    }
  ];
}]);
