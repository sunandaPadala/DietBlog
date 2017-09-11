'use strict';
angular.module('dietBlog')
  .controller('blogDetailsCtrl', function($scope, blogService, blogDetails, ReusableCalls, $uibModal) {
    //$scope.blogPageDetails = myService.getter();
    //console.log($scope.blogPageDetails);
    //$( ".blog-captions" ).html($scope.blogPageDetails.description);
    //$($scope.blogPageDetails.description).appendTo($(".blog-captions"));
    // $scope.blogPostId = $scope.blogPageDetails.id;

    $scope.details = blogDetails;
    console.log($scope.details);
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
      angular.element('.loadingIndicator').show();
      blogService.postComments(id, commentDetails).then(function(response) {
        angular.element('.loadingIndicator').hide();
        console.log(response);
        if (response.data.message == "SUCCESS") {
          $scope.commentText = '';
          $scope.commenterMail = '';
          $scope.commenterName = '';

          var mess = "Comments posted successfully.You can view once admin accept the comment."
          //ReusableCalls.alertMessage("",mess);
          var modalInstance = $uibModal.open({
            //animation: $ctrl.animationsEnabled,
            //ariaLabelledBy: 'modal-title-top',
            //ariaDescribedBy: 'modal-body-top',
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
        angular.element('.loadingIndicator').hide();
        console.log(error);
        //ReusableCalls.alertMessage("",error.error);
        var modalInstance = $uibModal.open({
          //animation: $ctrl.animationsEnabled,
          //ariaLabelledBy: 'modal-title-top',
          //ariaDescribedBy: 'modal-body-top',
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

    // blogService.getSpecificData($scope.blogPostId).then(function(response) {
    //   console.log(response);
    //   $scope.blogPostResponse = response;
    // }, function(error) {
    //   console.log(error);
    // });
  });
