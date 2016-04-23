angular.module('Tracker')
    .factory('UserService', function (resource) {

        var Me = resource('/api/users/me');
        // /api/auth/login
        // /api/auth/logout
        // /api/auth/signup

        var Auth = resource('/api/auth/:action', {}, {
           logout: {
               method: 'POST',
               params: {
                   action: 'logout'
               }
           },
           login: {
               method: 'POST',
               params: {
                   action: 'login'
               }
           }
        });

        var self = {
            user: null,
            logout: function () {
                return Auth.logout().$promise.then(function () {
                    self.user = null;
                })
            },
            load: function () {
                return Me.get().$promise.then(function (user) {
                    self.user = user;
                    return user;
                });
            }
        };

        return self;
    })
;