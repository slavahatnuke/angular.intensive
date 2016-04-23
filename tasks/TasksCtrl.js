angular.module('Tracker')
    .factory('Task', function (resource) {
        return resource('/api/projects/:projectId/tasks/:taskId',
            {
                projectId: '@project',
                taskId: '@_id'
            },
            {
                update: {
                    method: 'PUT'
                }
            }
        );
    })
    .controller('TasksCtrl', function ($scope, Task) {
        $scope.tasks = Task.query();

        $scope.remove = function (task) {
            task.$remove().then(function () {
                $scope.tasks = Task.query();
            });
        }
    })
;