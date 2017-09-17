'use strict';
angular.module('dietBlog')
  .controller('blogDetailsCtrl', function($scope, blogService, blogDetails, $uibModal) {
    $scope.details = blogDetails;
    $scope.comments = [{
      "id": 1,
      "comment": "Passage of Lorem Ipsum of passages of Lorem Ipsum available, but the m injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the!",
      "name": "Samantha Stevens",
      "time": "January 10, 2017 at 10:46 am",
      "imgsrc": "images/150x150.png"
    }, {
      "id": 2,
      "comment": "Saage of Lorem Ipsum of passages injected humour, or randomised words which don't look even slightly believable. If you are going!",
      "name": "Patrick Smith",
      "time": "January 10, 2017 at 10:46 am",
      "imgsrc": "images/150x150.png"
    }, {
      "id": 3,
      "comment": "Saage of Lorem Ipsum of passages injected humour, or randomised words which don't look even slightly believable. If you are going!",
      "name": "Patrick Smith",
      "time": "January 10, 2017 at 10:46 am",
      "imgsrc": "images/150x150.png"
    }, {
      "id": 4,
      "comment": "Saage of Lorem Ipsum of passages injected humour, or randomised words which don't look even slightly believable. If you are going!",
      "name": "Patrick Smith",
      "time": "January 10, 2017 at 10:46 am",
      "imgsrc": "images/150x150.png"
    }];

    $scope.postComment = function(id) {
      var commentDetails = ({
        "commentText": $scope.commentText,
        "commented_by": {
          "email": $scope.commenterMail,
          "name": $scope.commenterName
        }
      });
      blogService.postComments(id, commentDetails).then(function(response) {
        if (response.data.message == "SUCCESS") {
          $scope.commentText = '';
          $scope.commenterMail = '';
          $scope.commenterName = '';

          var mess = "Comments posted successfully.You can view once admin accept the comment."
          var modalInstance = $uibModal.open({
            templateUrl: '../views/successModel.html',
            size: 'md',
            controller: function($scope) {
              $scope.message = mess;
              $scope.title = "Right my diet";
              $scope.ok = function() {
                modalInstance.close();
              };
            }
          });
        }
      }, function(error) {
        var modalInstance = $uibModal.open({
          templateUrl: '../views/successModel.html',
          size: 'md',
          controller: function($scope) {
            $scope.message = error.error;
            $scope.title = "Right my diet";
            $scope.ok = function() {
              modalInstance.close();
            };
          }
        });
      });
    };

  });
