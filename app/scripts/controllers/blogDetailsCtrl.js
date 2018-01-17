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

          var mess = "Comments posted successfully.You can view once admin accept the comment.";
           $scope.message = mess;
              $scope.title = "Right my diet";
          var modalInstance = $uibModal.open({
            // template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',
            
            templateUrl: 'views/successModel.html',
            size: 'md',
              scope:$scope,
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
          });
        }
      }, function(error) {
         $scope.message = error.error;
            $scope.title = "Right my diet";
        var modalInstance = $uibModal.open({
            // template: '<div class="modal-header"><h3 class="modal-title" id="modal-title">{{title}}</h3></div><div class="modal-body" id="modal-body">{{message}}</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()">OK</button></div>',

          templateUrl: 'views/successModel.html',
          size: 'md',
            scope:$scope,
          controller: 'ModalInstanceCtrl',
          controllerAs: '$ctrl',
        });
      });
    };
    $scope.loadBlogDetails = function(articleId) {
      $state.go('main.blogDetails', { id: articleId });
    };
  });
