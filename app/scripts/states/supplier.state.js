(function () {
    'use strict';

    angular.module('bmFrontendApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('supplier', {
            parent: 'site',
            url: '/supplier',
            data: {
                pageTitle: 'Proveedores'
            },
            views: {
                'container@': {
                    templateUrl: 'views/supplier.html',
                    controller: 'SupplierController',
                    controllerAs: 'vm'
                }
            }
        })
    });
})();
