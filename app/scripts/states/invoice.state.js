(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('invoice', {
            parent: 'site',
            url: '/invoice',
            data: {
                pageTitle: 'Compras'
            },
            views: {
                'container@': {
                    templateUrl: 'views/invoice.html',
                    controller: 'InvoiceController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('invoice-create', {
            parent: 'site',
            url: '/invoice/create',
            data: {
                pageTitle: 'Crear compra'
            },
            views: {
                'container@': {
                    templateUrl: 'views/invoice-create.html',
                    controller: 'InvoiceCreateController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: function () {
                    return null;
                }
            }
        })
    });
})();
