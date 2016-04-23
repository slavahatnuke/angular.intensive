angular.module('Tracker')
    .controller('SignupCtrl', function ($scope, resource, $rootScope) {

        var url = '/api/auth/signup';
        var Signup = resource(url);

        $scope.user = {};
        $scope.signup = function () {

            new Signup($scope.user).$save().then(function (user) {
                $rootScope.user = user;
                console.log('user', user);
            });

        }
    })
;