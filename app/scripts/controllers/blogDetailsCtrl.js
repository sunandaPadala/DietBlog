'use strict';
angular.module('dietBlog')
  .controller('blogDetailsCtrl', function($scope, blogService, blogDetails, $uibModal, $state) {
    $scope.details = blogDetails;
    $scope.searchStr = '';
    $scope.comments = blogDetails.comments;
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
