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
        .state('invoice-edit', {
            parent: 'site',
            url: '/invoice/edit/{id}',
            data: {
                pageTitle: 'Editar compra'
            },
            views: {
                'container@': {
                    templateUrl: 'views/invoice-create.html',
                    controller: 'InvoiceCreateController',
                    controllerAs: 'vm'
                },
                'complement@': {
                    templateUrl: 'views/invoice-line.html',
                    controller: 'InvoiceLineOfInvoiceController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: function(InvoiceService, $stateParams) {
                    return InvoiceService.resource.get({id: $stateParams.id}).$promise;
                }
            }
        })
    });
})();
