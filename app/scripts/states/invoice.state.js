(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('invoice', {
            parent: 'site',
            url: '/invoice',
            data: {
                pageTitle: 'Facturas'
            },
            views: {
                'container@': {
                    templateUrl: 'views/invoice.html',
                    controller: 'InvoiceController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
