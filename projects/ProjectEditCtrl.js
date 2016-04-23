angular.module('Tracker')
    .controller('ProjectEditCtrl', function ($scope, Project, $state) {

        var projectId = $state.params.projectId;

        if (projectId) {
            $scope.project = Project.get({projectId: projectId});
        } else {
            $scope.project = new Project();
        }

        $scope.save = function () {
            var promise = $scope.project._id ?
                $scope.project.$update() : $scope.project.$save();

            promise.then(function () {
                $state.go('app.projects.list');
            }, function (response) {
                $scope.error = response.data;
            })
        }
    })
;