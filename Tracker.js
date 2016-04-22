angular.module('Tracker', ['ui.router', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app/signup');

        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'Tracker.html',
                controller: 'TrackerCtrl'
            })
            .state('app.signup', {
                url: '/signup',
                templateUrl: 'user/signup.html',
                controller: 'SignupCtrl'
            })

    })
    .controller('TrackerCtrl', function ($scope) {
        $scope.test = 'ok'
    })
    .controller('SignupCtrl', function ($scope, $resource) {

        var url = 'http://angular.plus1generation.com/api/auth/signup';
        var Signup = $resource(url, {}, {
            xz: {method: 'XZ'}
        });

        $scope.user = {};
        $scope.signup = function () {

            new Signup($scope.user).$save().then(function () {
                console.log(arguments);
            });

            console.log($scope.user);
        }
    })
;