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
        .state('income-create', {
            parent: 'site',
            url: '/income/create',
            data: {
                pageTitle: 'Crear ingreso'
            },
            views: {
                'container@': {
                    templateUrl: 'views/income.create.html',
                    controller: 'IncomeCreateController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
