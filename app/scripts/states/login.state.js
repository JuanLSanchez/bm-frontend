(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('login', {
            parent: 'site',
            url: '/',
            data: {
                pageTitle: 'Login'
            },
            views: {
                'container@': {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
