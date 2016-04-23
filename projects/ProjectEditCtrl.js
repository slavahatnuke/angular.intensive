angular.module('Tracker')
    .controller('ProjectEditCtrl', function ($scope, Project, $state) {
        $scope.project = new Project();

        $scope.save = function () {
            $scope.project.$save().then(function () {
                $state.go('app.projects.list');
            }, function (response) {
                $scope.error = response.data;
            })
        }
    })
;