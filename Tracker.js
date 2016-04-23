angular.module('Tracker', ['ui.router', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app/signup');

        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'Tracker.html'
            })
            .state('app.signup', {
                url: '/signup',
                templateUrl: 'user/signup.html',
                controller: 'SignupCtrl'
            })

    })
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .factory('resource', function ($resource) {
        var baseUrl = 'http://angular.plus1generation.com';
        return function (url) {
            arguments[0] = baseUrl + url;
            return $resource.apply($resource, arguments);
        };
    })
    .run(function ($rootScope, UserService) {
        UserService.load().then(function (user) {
            $rootScope.user = user;
        });
    })
;