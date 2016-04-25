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

        $scope.load = load;

        load();

        $scope.addTask = function (task) {
            $scope.tasks.push(task);
        };

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
                originalTask: '=task',
                onComplete: '='
            },
            templateUrl: 'tasks/task-editor.html',
            controller: function ($scope, Task, User) {
                function setup() {
                    $scope.showForm = true;
                    $scope.users = User.query();
                    $scope.statuses = ['new', 'in-progress', 'done'];
                }

                $scope.add = function () {
                    $scope.task = new Task();
                    setup();
                };



                $scope.edit = function () {
                    $scope.task = angular.copy($scope.originalTask);
                    if($scope.task.assigned && $scope.task.assigned._id) {
                        $scope.task.assigned = $scope.task.assigned._id;
                    }
                    setup();
                };

                function done() {
                    $scope.onComplete && $scope.onComplete($scope.task);
                    $scope.showForm = false;
                }

                $scope.save = function () {
                    var params = {projectId: $scope.projectId};

                    var promise = $scope.task._id ?
                        $scope.task.$update() : $scope.task.$save(params);

                    promise.then(done).then(function () {
                        $scope.originalTask = $scope.task;
                    });
                }
            }
        };
    })
;