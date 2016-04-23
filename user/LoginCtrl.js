angular.module('Tracker')
    .controller('LoginCtrl', function ($scope, UserService, $state) {
        $scope.user = {};

        $scope.login = function () {
            UserService.login($scope.user).then(function () {
                $state.go('app.projects.list');
            });
        }
    })
;