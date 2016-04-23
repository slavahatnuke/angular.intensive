angular.module('Tracker')
    .factory('User', function (resource) {
        return resource('/api/users');
    })
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
        $scope.projectId = $state.params.projectId;

        function load() {
            $scope.tasks = Task.query({projectId: $scope.projectId});
        }

        load();

        $scope.remove = function (task) {
            task.$remove().then(function () {
                load();
            });
        }
    })
    .directive('taskEditor', function () {
        return {
            restrict: 'AE',
            scope: {
                projectId: '=',
                originalTask: '=task'
            },
            templateUrl: 'tasks/task-editor.html',
            controller: function ($scope, Task, User) {
                $scope.add = function () {
                    $scope.task = new Task();
                    $scope.showForm = true;
                    $scope.users = User.query();
                    $scope.statuses = ['new', 'in-progress', 'done'];
                };

                $scope.save = function () {
                    var params = {projectId: $scope.projectId};
                     $scope.task.$save(params).then(function () {
                        console.log(arguments);
                    });
                }
            }
        };
    })
;