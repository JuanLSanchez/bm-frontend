(function() {
    'use strict';

    angular.module('bmFrontendApp')
      .directive('supplierCreate', supplierCreate);

    function supplierCreate () {
        return {
            templateUrl: 'views/supplier-create.html',
            restrict: 'E',
            controller: 'SupplierCreateController',
            controllerAs: 'vm',
            scope: {
                supplier: '=',
                success: '=',
                error: '=',
                edition: '='
            },
            bindToController: true,
            replace: true
        };
    }

})();
