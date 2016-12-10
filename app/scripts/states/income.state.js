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
            },
            resolve: {
                entity: function(IncomeService, $stateParams) {
                    return null;
                }
            }
        })
        .state('income-edit', {
            parent: 'site',
            url: '/income/edit/{id}',
            data: {
                pageTitle: 'Editar ingreso'
            },
            views: {
                'container@': {
                    templateUrl: 'views/income.create.html',
                    controller: 'IncomeCreateController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: function(IncomeService, $stateParams) {
                    return IncomeService.resource.get({id: $stateParams.id});
                }
            }
        })
    });
})();
