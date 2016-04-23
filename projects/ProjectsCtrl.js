angular.module('Tracker')
    .factory('Project', function (resource) {
        return resource('/api/projects');
    })
    .controller('ProjectsCtrl', function ($scope, Project) {
        $scope.projects = Project.query();
    })
;