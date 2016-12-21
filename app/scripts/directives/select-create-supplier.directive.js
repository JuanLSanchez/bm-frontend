(function() {
    'use strict';

    angular.module('bmFrontendApp')
    .directive('selectCreateSupplier', function () {
        return {
            templateUrl: 'views/select-create-supplier.html',
            restrict: 'E',
            controller: 'selectCreateSupplierController',
            controllerAs: 'vm',
            scope: {
                supplierId: '='
            },
            bindToController: true,
            replace: true
        };
    });
})();
