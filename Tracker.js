angular.module('Tracker', ['ui.router', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app/signup');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'Tracker.html'
            })
            .state('app.signup', {
                url: '/signup',
                templateUrl: 'user/signup.html',
                controller: 'SignupCtrl'
            })
            .state('app.logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })
            .state('app.login', {
                url: '/login',
                templateUrl: 'user/login.html',
                controller: 'LoginCtrl'
            })
            .state('app.projects', {
                url: '/projects',
                templateUrl: 'projects/projects.html',
                controller: 'ProjectsCtrl'
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
        $rootScope.UserService = UserService;

        $rootScope.$watch('UserService.user', function (user) {
            $rootScope.user = user;
        });

        UserService.load();
    })
;

