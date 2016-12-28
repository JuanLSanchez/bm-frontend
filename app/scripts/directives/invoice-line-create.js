(function() {
    'use strict';

    angular.module('bmFrontendApp')
      .directive('invoiceLineCreate', invoiceLineCreate);

    function invoiceLineCreate () {
        return {
            templateUrl: 'views/invoice-line-create.html',
            restrict: 'E',
            controller: 'InvoiceLineCreateController',
            controllerAs: 'vm',
            scope: {
                invoiceLine: '=',
                success: '=',
                error: '=',
                edition: '=',
                invoiceId: '='
            },
            bindToController: true,
            replace: true
        };
    }

})();
