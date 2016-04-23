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
    .controller('TasksCtrl', function ($scope, Task, $state) {
        var projectId = $state.params.projectId;

        function load() {
            $scope.tasks = Task.query({projectId: projectId});
        }

        load();

        $scope.remove = function (task) {
            task.$remove().then(function () {
                load();
            });
        }
    })
;