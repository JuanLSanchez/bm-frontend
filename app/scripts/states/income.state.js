(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('income', {
            parent: 'site',
            url: '/income',
            data: {
                pageTitle: 'Ingresos'
            },
            views: {
                'container@': {
                    templateUrl: 'views/income.html',
                    controller: 'IncomeController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
