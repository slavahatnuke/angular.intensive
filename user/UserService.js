angular.module('Tracker')
    .factory('UserService', function (resource) {

        var Me = resource('/api/users/me');

        var self = {
            user: null,
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