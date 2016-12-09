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
            ncyBreadcrumb: {
                skip: true
            },
            views: {
                'content@': {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
