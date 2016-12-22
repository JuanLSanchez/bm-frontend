(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('operation', {
            parent: 'site',
            url: '/operation',
            data: {
                pageTitle: 'Operaciones'
            },
            views: {
                'container@': {
                    templateUrl: 'views/operation.html',
                    controller: 'OperationController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
