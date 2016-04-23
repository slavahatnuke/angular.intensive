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
                abstract: true,
                template: '<ui-view></ui-view><ui-view name="workspace"></ui-view>'
            })
            .state('app.projects.list', {
                url: '/list',
                templateUrl: 'projects/projects.html',
                controller: 'ProjectsCtrl'
            })
            .state('app.projects.new', {
                url: '/new',
                templateUrl: 'projects/edit.html',
                controller: 'ProjectEditCtrl'
            })
            .state('app.projects.edit', {
                url: '/:projectId/edit',
                templateUrl: 'projects/edit.html',
                controller: 'ProjectEditCtrl'
            })
            .state('app.project', {
                parent: 'app.projects',
                url: '/:projectId',
                views: {
                    '': {
                        templateUrl: 'projects/show.html',
                        controller: 'ProjectCtrl'
                    },
                    'workspace': {
                        templateUrl: 'tasks/tasks.html',
                        controller: 'TasksCtrl'
                    }
                }
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

