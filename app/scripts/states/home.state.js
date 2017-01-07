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
            views: {
                'container@': {
                    templateUrl: 'views/home.html',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
