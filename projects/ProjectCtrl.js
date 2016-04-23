angular.module('Tracker')
    .controller('ProjectCtrl', function ($scope, Project, $state) {
        var projectId = $state.params.projectId;
        $scope.project = Project.get({projectId: projectId});
    })
;