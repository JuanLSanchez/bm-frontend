(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('home', {
            parent: 'site',
            url: '/home',
            data: {
                pageTitle: 'Inicio'
            },
            ncyBreadcrumb: {
                skip: true
            },
            views: {
                'content@': {
                    templateUrl: 'views/home.html',
                }
            }
        })
    });
})();
