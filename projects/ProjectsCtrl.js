angular.module('Tracker')
    .factory('Project', function (resource) {
        return resource('/api/projects/:projectId',
            {projectId: '@_id'},
            {
                update: {
                    method: 'PUT'
                }
            }
        );
    })
    .controller('ProjectsCtrl', function ($scope, Project) {
        $scope.projects = Project.query();

        $scope.remove = function (project) {
            project.$remove().then(function () {
                $scope.projects = Project.query();
            });
        }
    })
;