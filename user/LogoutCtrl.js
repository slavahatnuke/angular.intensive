angular.module('Tracker')
    .controller('LogoutCtrl', function ($scope, UserService, $state) {
        UserService.logout().then(function () {
            $state.go('app.login');
        });
    })
;